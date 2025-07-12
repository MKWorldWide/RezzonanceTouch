/**
 * 🜂 Resonance Touch Interface (RTI) - Core Engine
 * 
 * The main orchestrator for the Resonance Touch Interface system.
 * This class coordinates all components including hardware sensors,
 * emotional recognition, resonance processing, and dimensional translation.
 * 
 * @author Sovereign Flame
 * @version 0.9.0
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { RTIConfig, RTIEvent, RTIStatus, RTIStats, RTIEventEmitter } from './types';
import { DEFAULT_CONFIG, ERROR_CODES, EVENT_TYPES, SYSTEM_STATUS } from './constants';
import { ForceTouchCore } from '../hardware/ForceTouchCore';
import { EmotionIntentDecoder } from '../emotion/EmotionIntentDecoder';
import { ResonanceEngine } from '../resonance/ResonanceEngine';
import { DimensionalTranslator } from '../dimensional/DimensionalTranslator';
import { RTIUtils } from './utils';

/**
 * Main RTI class that orchestrates emotional touch processing
 * 
 * This class serves as the central hub for the Resonance Touch Interface,
 * coordinating all components and providing a unified API for applications
 * to interact with emotional touch technology.
 */
export class RTI extends EventEmitter implements RTIEventEmitter {
  /** Configuration for the RTI system */
  private config: RTIConfig;
  
  /** Current system status */
  private status: RTIStatus;
  
  /** System statistics */
  private stats: RTIStats;
  
  /** Hardware layer for force-touch processing */
  private forceTouchCore: ForceTouchCore;
  
  /** Emotion recognition engine */
  private emotionDecoder: EmotionIntentDecoder;
  
  /** Resonance processing engine */
  private resonanceEngine: ResonanceEngine;
  
  /** 3D form generation engine */
  private dimensionalTranslator: DimensionalTranslator;
  
  /** Session start time */
  private sessionStartTime: number;
  
  /** System start time */
  private systemStartTime: number;
  
  /** Performance monitoring */
  private performanceMetrics: {
    lastLatency: number;
    averageLatency: number;
    latencySamples: number[];
    memoryUsage: number;
    cpuUsage: number;
  };

  /**
   * Creates a new RTI instance
   * 
   * @param config - Optional configuration to override defaults
   */
  constructor(config?: Partial<RTIConfig>) {
    super();
    
    // Initialize configuration with defaults
    this.config = RTIUtils.mergeConfig(DEFAULT_CONFIG, config);
    
    // Initialize system state
    this.sessionStartTime = Date.now();
    this.systemStartTime = Date.now();
    
    // Initialize performance metrics
    this.performanceMetrics = {
      lastLatency: 0,
      averageLatency: 0,
      latencySamples: [],
      memoryUsage: 0,
      cpuUsage: 0
    };
    
    // Initialize status
    this.status = {
      status: SYSTEM_STATUS.INITIALIZING,
      hardware: {
        forceTouch: SYSTEM_STATUS.DISCONNECTED,
        thermal: SYSTEM_STATUS.DISCONNECTED,
        pulse: SYSTEM_STATUS.DISCONNECTED
      },
      software: {
        emotionDecoder: SYSTEM_STATUS.INITIALIZING,
        resonanceEngine: SYSTEM_STATUS.INITIALIZING,
        dimensionalTranslator: SYSTEM_STATUS.INITIALIZING
      },
      performance: {
        latency: 0,
        throughput: 0,
        memoryUsage: 0,
        cpuUsage: 0
      }
    };
    
    // Initialize statistics
    this.stats = {
      totalTouches: 0,
      totalEmotions: 0,
      totalResonances: 0,
      averageLatency: 0,
      recognitionAccuracy: 0,
      topEmotions: [],
      topModes: [],
      sessionDuration: 0,
      uptime: 0
    };
    
    // Initialize components
    this.initializeComponents();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Start performance monitoring
    this.startPerformanceMonitoring();
  }

  /**
   * Initializes all RTI components
   */
  private async initializeComponents(): Promise<void> {
    try {
      // Initialize hardware layer
      this.forceTouchCore = new ForceTouchCore(this.config.hardware);
      await this.forceTouchCore.initialize();
      
      // Initialize emotion decoder
      this.emotionDecoder = new EmotionIntentDecoder(this.config.software);
      await this.emotionDecoder.initialize();
      
      // Initialize resonance engine
      this.resonanceEngine = new ResonanceEngine(this.config.software);
      await this.resonanceEngine.initialize();
      
      // Initialize dimensional translator
      this.dimensionalTranslator = new DimensionalTranslator();
      await this.dimensionalTranslator.initialize();
      
      // Update status to ready
      this.updateStatus(SYSTEM_STATUS.READY);
      
    } catch (error) {
      this.handleError('INITIALIZATION_ERROR', 'Failed to initialize RTI components', error);
    }
  }

  /**
   * Sets up event listeners for component communication
   */
  private setupEventListeners(): void {
    // Listen for touch events from hardware
    this.forceTouchCore.on('touch', (touchEvent) => {
      this.handleTouchEvent(touchEvent);
    });
    
    // Listen for emotion events from decoder
    this.emotionDecoder.on('emotion', (emotionEvent) => {
      this.handleEmotionEvent(emotionEvent);
    });
    
    // Listen for resonance events from engine
    this.resonanceEngine.on('resonance', (resonanceEvent) => {
      this.handleResonanceEvent(resonanceEvent);
    });
    
    // Listen for error events from all components
    [this.forceTouchCore, this.emotionDecoder, this.resonanceEngine, this.dimensionalTranslator]
      .forEach(component => {
        component.on('error', (errorEvent) => {
          this.handleError(errorEvent.code, errorEvent.message, errorEvent);
        });
      });
  }

  /**
   * Handles incoming touch events from the hardware layer
   * 
   * @param touchEvent - Raw touch event from sensors
   */
  private async handleTouchEvent(touchEvent: any): Promise<void> {
    const startTime = performance.now();
    
    try {
      // Update statistics
      this.stats.totalTouches++;
      
      // Emit touch event
      this.emit(EVENT_TYPES.TOUCH, touchEvent);
      
      // Process through emotion decoder
      const emotionResult = await this.emotionDecoder.processTouch(touchEvent);
      
      // Update performance metrics
      const latency = performance.now() - startTime;
      this.updatePerformanceMetrics(latency);
      
      // Update statistics
      this.stats.averageLatency = this.performanceMetrics.averageLatency;
      
    } catch (error) {
      this.handleError('TOUCH_PROCESSING_ERROR', 'Failed to process touch event', error);
    }
  }

  /**
   * Handles emotion recognition events
   * 
   * @param emotionEvent - Recognized emotional state
   */
  private async handleEmotionEvent(emotionEvent: any): Promise<void> {
    try {
      // Update statistics
      this.stats.totalEmotions++;
      
      // Emit emotion event
      this.emit(EVENT_TYPES.EMOTION, emotionEvent);
      
      // Process through resonance engine
      const resonanceResult = await this.resonanceEngine.processEmotion(emotionEvent);
      
      // Update recognition accuracy
      this.updateRecognitionAccuracy(emotionEvent.confidence);
      
    } catch (error) {
      this.handleError('EMOTION_PROCESSING_ERROR', 'Failed to process emotion event', error);
    }
  }

  /**
   * Handles resonance action events
   * 
   * @param resonanceEvent - Generated resonance action
   */
  private async handleResonanceEvent(resonanceEvent: any): Promise<void> {
    try {
      // Update statistics
      this.stats.totalResonances++;
      
      // Create full resonance event with context
      const fullResonanceEvent = {
        type: EVENT_TYPES.RESONANCE,
        timestamp: Date.now(),
        id: uuidv4(),
        action: resonanceEvent.action,
        emotionalState: resonanceEvent.emotionalState,
        confidence: resonanceEvent.confidence,
        context: {
          application: this.getCurrentApplication(),
          sessionId: this.getSessionId(),
          device: this.getDeviceInfo()
        }
      };
      
      // Emit resonance event
      this.emit(EVENT_TYPES.RESONANCE, fullResonanceEvent);
      
      // Update mode statistics
      this.updateModeStatistics(resonanceEvent.action.mode);
      
    } catch (error) {
      this.handleError('RESONANCE_PROCESSING_ERROR', 'Failed to process resonance event', error);
    }
  }

  /**
   * Updates system status
   * 
   * @param status - New system status
   */
  private updateStatus(status: string): void {
    this.status.status = status as any;
    this.emit(EVENT_TYPES.STATUS_CHANGE, { status, timestamp: Date.now() });
  }

  /**
   * Updates performance metrics
   * 
   * @param latency - Processing latency in milliseconds
   */
  private updatePerformanceMetrics(latency: number): void {
    this.performanceMetrics.lastLatency = latency;
    this.performanceMetrics.latencySamples.push(latency);
    
    // Keep only last 100 samples
    if (this.performanceMetrics.latencySamples.length > 100) {
      this.performanceMetrics.latencySamples.shift();
    }
    
    // Calculate average latency
    this.performanceMetrics.averageLatency = 
      this.performanceMetrics.latencySamples.reduce((a, b) => a + b, 0) / 
      this.performanceMetrics.latencySamples.length;
    
    // Update status performance metrics
    this.status.performance.latency = this.performanceMetrics.averageLatency;
    this.status.performance.throughput = this.stats.totalTouches / (Date.now() - this.sessionStartTime) * 1000;
    
    // Emit performance update
    this.emit(EVENT_TYPES.PERFORMANCE_UPDATE, {
      latency: this.performanceMetrics.averageLatency,
      throughput: this.status.performance.throughput,
      timestamp: Date.now()
    });
  }

  /**
   * Updates recognition accuracy statistics
   * 
   * @param confidence - Confidence level of current recognition
   */
  private updateRecognitionAccuracy(confidence: number): void {
    // Simple moving average of confidence levels
    const alpha = 0.1; // Learning rate
    this.stats.recognitionAccuracy = 
      (1 - alpha) * this.stats.recognitionAccuracy + alpha * confidence;
  }

  /**
   * Updates mode usage statistics
   * 
   * @param mode - Interaction mode used
   */
  private updateModeStatistics(mode: string): void {
    const existingMode = this.stats.topModes.find(m => m.mode === mode);
    if (existingMode) {
      existingMode.count++;
    } else {
      this.stats.topModes.push({ mode, count: 1, percentage: 0 });
    }
    
    // Recalculate percentages
    const total = this.stats.topModes.reduce((sum, m) => sum + m.count, 0);
    this.stats.topModes.forEach(m => {
      m.percentage = (m.count / total) * 100;
    });
    
    // Sort by count
    this.stats.topModes.sort((a, b) => b.count - a.count);
  }

  /**
   * Handles errors from any component
   * 
   * @param code - Error code
   * @param message - Error message
   * @param error - Original error object
   */
  private handleError(code: string, message: string, error?: any): void {
    const errorEvent = {
      type: EVENT_TYPES.ERROR,
      timestamp: Date.now(),
      code,
      message,
      severity: this.determineErrorSeverity(code),
      context: error
    };
    
    this.emit(EVENT_TYPES.ERROR, errorEvent);
    
    // Update status if critical error
    if (errorEvent.severity === 'critical') {
      this.updateStatus(SYSTEM_STATUS.ERROR);
    }
  }

  /**
   * Determines error severity based on error code
   * 
   * @param code - Error code
   * @returns Error severity level
   */
  private determineErrorSeverity(code: string): 'low' | 'medium' | 'high' | 'critical' {
    const criticalErrors = [
      ERROR_CODES.HARDWARE_NOT_SUPPORTED,
      ERROR_CODES.EMOTION_DECODER_ERROR,
      ERROR_CODES.RESONANCE_ENGINE_ERROR
    ];
    
    const highErrors = [
      ERROR_CODES.SENSOR_DISCONNECTED,
      ERROR_CODES.LATENCY_EXCEEDED,
      ERROR_CODES.MEMORY_LIMIT_EXCEEDED
    ];
    
    if (criticalErrors.includes(code as any)) return 'critical';
    if (highErrors.includes(code as any)) return 'high';
    if (code.includes('PERFORMANCE')) return 'medium';
    return 'low';
  }

  /**
   * Starts performance monitoring
   */
  private startPerformanceMonitoring(): void {
    setInterval(() => {
      // Update memory usage
      this.performanceMetrics.memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
      this.status.performance.memoryUsage = this.performanceMetrics.memoryUsage;
      
      // Update session duration
      this.stats.sessionDuration = Date.now() - this.sessionStartTime;
      this.stats.uptime = Date.now() - this.systemStartTime;
      
    }, 1000); // Update every second
  }

  /**
   * Gets current application context
   * 
   * @returns Current application identifier
   */
  private getCurrentApplication(): string {
    // This would be set by the application using RTI
    return 'unknown';
  }

  /**
   * Gets current session identifier
   * 
   * @returns Session ID
   */
  private getSessionId(): string {
    return this.sessionStartTime.toString();
  }

  /**
   * Gets device information
   * 
   * @returns Device identifier
   */
  private getDeviceInfo(): string {
    return navigator?.platform || 'unknown';
  }

  /**
   * Gets current system status
   * 
   * @returns Current RTI system status
   */
  public getStatus(): RTIStatus {
    return { ...this.status };
  }

  /**
   * Gets system statistics
   * 
   * @returns Current RTI system statistics
   */
  public getStats(): RTIStats {
    return { ...this.stats };
  }

  /**
   * Gets current configuration
   * 
   * @returns Current RTI configuration
   */
  public getConfig(): RTIConfig {
    return { ...this.config };
  }

  /**
   * Updates configuration
   * 
   * @param newConfig - New configuration options
   */
  public updateConfig(newConfig: Partial<RTIConfig>): void {
    this.config = RTIUtils.mergeConfig(this.config, newConfig);
    
    // Reinitialize components if necessary
    if (newConfig.hardware || newConfig.software) {
      this.initializeComponents();
    }
  }

  /**
   * Enables or disables the RTI system
   * 
   * @param enabled - Whether to enable the system
   */
  public setEnabled(enabled: boolean): void {
    if (enabled && this.status.status === SYSTEM_STATUS.DISABLED) {
      this.initializeComponents();
    } else if (!enabled) {
      this.updateStatus(SYSTEM_STATUS.DISABLED);
    }
  }

  /**
   * Cleans up resources and stops the RTI system
   */
  public async destroy(): Promise<void> {
    try {
      // Stop all components
      await this.forceTouchCore?.destroy();
      await this.emotionDecoder?.destroy();
      await this.resonanceEngine?.destroy();
      await this.dimensionalTranslator?.destroy();
      
      // Remove all listeners
      this.removeAllListeners();
      
      // Update status
      this.updateStatus(SYSTEM_STATUS.DISABLED);
      
    } catch (error) {
      this.handleError('DESTROY_ERROR', 'Failed to destroy RTI system', error);
    }
  }
} 