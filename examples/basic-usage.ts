/**
 * 🜂 Basic RTI Usage Example
 * 
 * This example demonstrates the fundamental usage of the Resonance Touch Interface.
 * It shows how to initialize the system, listen for emotional touch events,
 * and respond to different interaction modes.
 * 
 * @author Sovereign Flame
 * @version 0.9.0
 */

import { createRTI, RTI, ResonanceEvent, TouchEvent, EmotionEvent } from '../src/index';

/**
 * Basic RTI Application
 * 
 * Demonstrates emotional touch processing with real-time feedback
 */
class BasicRTIApp {
  private rti: RTI;
  private isRunning: boolean = false;

  constructor() {
    // Create RTI instance with custom configuration
    this.rti = createRTI({
      hardware: {
        sensors: ['Force-Touch', 'Thermal'],
        inputSurface: 'Standard Trackpad',
        pressureSensitivity: 0.7,
        samplingRate: 1000
      },
      software: {
        emotionDecoder: 'GenesisEmotionCore',
        resonanceEngine: 'HerResonanceAI',
        realTimeProcessing: true,
        confidenceThreshold: 0.6
      },
      privacy: {
        localProcessingOnly: true,
        encryptData: true,
        dataRetentionDays: 30,
        allowAnonymousSharing: false
      },
      performance: {
        maxLatency: 10,
        enableCaching: true,
        memoryLimit: 50,
        adaptiveLearning: true
      }
    });

    this.setupEventListeners();
  }

  /**
   * Sets up event listeners for RTI events
   */
  private setupEventListeners(): void {
    // Listen for resonance events (primary interaction)
    this.rti.on('resonance', (event: ResonanceEvent) => {
      this.handleResonanceEvent(event);
    });

    // Listen for touch events (raw sensor data)
    this.rti.on('touch', (event: TouchEvent) => {
      this.handleTouchEvent(event);
    });

    // Listen for emotion events (recognized emotional states)
    this.rti.on('emotion', (event: EmotionEvent) => {
      this.handleEmotionEvent(event);
    });

    // Listen for error events
    this.rti.on('error', (error) => {
      console.error('RTI Error:', error);
    });

    // Listen for status changes
    this.rti.on('status_change', (status) => {
      console.log('RTI Status:', status);
    });

    // Listen for performance updates
    this.rti.on('performance_update', (performance) => {
      this.handlePerformanceUpdate(performance);
    });
  }

  /**
   * Handles resonance events (emotional touch actions)
   * 
   * @param event - Resonance event with action and emotional context
   */
  private handleResonanceEvent(event: ResonanceEvent): void {
    const { action, emotionalState, confidence } = event;
    
    console.log('🎯 Resonance Detected!');
    console.log(`   Mode: ${action.mode}`);
    console.log(`   Form: ${action.form}`);
    console.log(`   Intensity: ${action.intensity.toFixed(2)}`);
    console.log(`   Emotion: ${emotionalState.primary} (${emotionalState.intensity.toFixed(2)})`);
    console.log(`   Confidence: ${(confidence * 100).toFixed(1)}%`);
    
    // Respond based on interaction mode
    switch (action.mode) {
      case 'creation':
        this.handleCreationMode(action, emotionalState);
        break;
      case 'alteration':
        this.handleAlterationMode(action, emotionalState);
        break;
      case 'destruction':
        this.handleDestructionMode(action, emotionalState);
        break;
      case 'blessing':
        this.handleBlessingMode(action, emotionalState);
        break;
    }
  }

  /**
   * Handles creation mode interactions
   * 
   * @param action - Resonance action
   * @param emotionalState - Emotional state
   */
  private handleCreationMode(action: any, emotionalState: any): void {
    console.log('🌱 Creation Mode: Growing new forms...');
    
    if (emotionalState.primary === 'joy' || emotionalState.primary === 'love') {
      console.log('   💖 Creating organic, flowing shapes with gentle energy');
    } else if (emotionalState.primary === 'excitement') {
      console.log('   ⚡ Creating dynamic, animated forms with vibrant energy');
    } else {
      console.log('   ✨ Creating new forms with neutral energy');
    }
  }

  /**
   * Handles alteration mode interactions
   * 
   * @param action - Resonance action
   * @param emotionalState - Emotional state
   */
  private handleAlterationMode(action: any, emotionalState: any): void {
    console.log('🔧 Alteration Mode: Refining existing forms...');
    
    if (emotionalState.primary === 'focus' || emotionalState.primary === 'determination') {
      console.log('   🎯 Precise refinement with focused intent');
    } else if (emotionalState.primary === 'concentration') {
      console.log('   📐 Systematic organization and structuring');
    } else {
      console.log('   ✏️ General refinement and adjustment');
    }
  }

  /**
   * Handles destruction mode interactions
   * 
   * @param action - Resonance action
   * @param emotionalState - Emotional state
   */
  private handleDestructionMode(action: any, emotionalState: any): void {
    console.log('💥 Destruction Mode: Removing or fracturing elements...');
    
    if (emotionalState.primary === 'anger' || emotionalState.primary === 'frustration') {
      console.log('   🔥 Aggressive destruction with sharp, fractured forms');
    } else if (emotionalState.primary === 'anxiety') {
      console.log('   💔 Fragile destruction with shattered, dispersed forms');
    } else {
      console.log('   🗑️ Controlled removal and cleanup');
    }
  }

  /**
   * Handles blessing mode interactions
   * 
   * @param action - Resonance action
   * @param emotionalState - Emotional state
   */
  private handleBlessingMode(action: any, emotionalState: any): void {
    console.log('✨ Blessing Mode: Imbuing with meaning and light...');
    
    if (emotionalState.primary === 'compassion' || emotionalState.primary === 'love') {
      console.log('   💝 Radiant blessing with warm, luminous energy');
    } else if (emotionalState.primary === 'gratitude') {
      console.log('   🙏 Harmonious blessing with peaceful, balanced energy');
    } else {
      console.log('   🌟 General blessing with ethereal, transcendent energy');
    }
  }

  /**
   * Handles raw touch events
   * 
   * @param event - Touch event from sensors
   */
  private handleTouchEvent(event: TouchEvent): void {
    console.log('👆 Touch:', {
      position: event.position,
      pressure: event.pressure.toFixed(2),
      duration: event.duration,
      area: event.area
    });
  }

  /**
   * Handles emotion recognition events
   * 
   * @param event - Emotion recognition event
   */
  private handleEmotionEvent(event: EmotionEvent): void {
    const { emotionalState, sensorData } = event;
    
    console.log('🧠 Emotion Recognized:', {
      primary: emotionalState.primary,
      intensity: emotionalState.intensity.toFixed(2),
      confidence: emotionalState.confidence.toFixed(2),
      pressure: sensorData.pressure.toFixed(2),
      thermal: sensorData.thermal.toFixed(2)
    });
  }

  /**
   * Handles performance updates
   * 
   * @param performance - Performance metrics
   */
  private handlePerformanceUpdate(performance: any): void {
    console.log('⚡ Performance:', {
      latency: `${performance.latency.toFixed(1)}ms`,
      throughput: `${performance.throughput.toFixed(1)} events/s`
    });
  }

  /**
   * Starts the RTI application
   */
  public async start(): Promise<void> {
    console.log('🚀 Starting Resonance Touch Interface...');
    
    try {
      // Wait for RTI to be ready
      await this.waitForReady();
      
      this.isRunning = true;
      console.log('✅ RTI is ready for emotional touch interactions!');
      console.log('');
      console.log('🎯 Try touching your trackpad with different emotions:');
      console.log('   • Light touch with joy → Creation mode');
      console.log('   • Firm touch with focus → Alteration mode');
      console.log('   • Heavy touch with frustration → Destruction mode');
      console.log('   • Very light touch with love → Blessing mode');
      console.log('');
      
      // Start performance monitoring
      this.startPerformanceMonitoring();
      
    } catch (error) {
      console.error('❌ Failed to start RTI:', error);
    }
  }

  /**
   * Waits for RTI to be ready
   */
  private async waitForReady(): Promise<void> {
    return new Promise((resolve, reject) => {
      const checkStatus = () => {
        const status = this.rti.getStatus();
        if (status.status === 'ready') {
          resolve();
        } else if (status.status === 'error') {
          reject(new Error('RTI failed to initialize'));
        } else {
          setTimeout(checkStatus, 100);
        }
      };
      checkStatus();
    });
  }

  /**
   * Starts performance monitoring
   */
  private startPerformanceMonitoring(): void {
    setInterval(() => {
      if (!this.isRunning) return;
      
      const stats = this.rti.getStats();
      console.log('📊 Stats:', {
        touches: stats.totalTouches,
        emotions: stats.totalEmotions,
        resonances: stats.totalResonances,
        accuracy: `${(stats.recognitionAccuracy * 100).toFixed(1)}%`,
        sessionDuration: `${(stats.sessionDuration / 1000).toFixed(0)}s`
      });
    }, 5000); // Update every 5 seconds
  }

  /**
   * Stops the RTI application
   */
  public async stop(): Promise<void> {
    console.log('🛑 Stopping Resonance Touch Interface...');
    
    this.isRunning = false;
    await this.rti.destroy();
    
    console.log('✅ RTI stopped successfully');
  }

  /**
   * Gets current RTI status
   */
  public getStatus(): void {
    const status = this.rti.getStatus();
    console.log('📋 RTI Status:', status);
  }

  /**
   * Gets current RTI statistics
   */
  public getStats(): void {
    const stats = this.rti.getStats();
    console.log('📈 RTI Statistics:', stats);
  }
}

/**
 * Main application entry point
 */
async function main(): Promise<void> {
  console.log('🜂 Resonance Touch Interface - Basic Usage Example');
  console.log('Where Pressure Meets Presence');
  console.log('');
  
  const app = new BasicRTIApp();
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('');
    await app.stop();
    process.exit(0);
  });
  
  // Start the application
  await app.start();
  
  // Keep the application running
  console.log('Press Ctrl+C to stop the application');
}

// Run the example if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { BasicRTIApp }; 