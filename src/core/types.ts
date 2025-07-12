/**
 * 🜂 Core RTI Types
 * 
 * Type definitions for the Resonance Touch Interface core system.
 * These types define the fundamental data structures and interfaces
 * that enable emotional resonance computing.
 */

import { EventEmitter } from 'events';
import { EmotionalState } from '../emotion/types';
import { ResonanceAction } from '../resonance/types';
import { MorphogeneticForm } from '../dimensional/types';

/**
 * RTI Configuration Interface
 * 
 * Defines the configuration options for the Resonance Touch Interface.
 * This includes hardware settings, emotional recognition parameters,
 * and system behavior preferences.
 */
export interface RTIConfig {
  /** Hardware configuration for force-touch sensors */
  hardware: {
    /** Available sensor types */
    sensors: Array<'Force-Touch' | 'Pulse' | 'Thermal'>;
    /** Input surface type */
    inputSurface: 'Haptic-Responsive Glass' | 'Flexible Display' | 'Standard Trackpad';
    /** Pressure sensitivity range (0.0 to 1.0) */
    pressureSensitivity: number;
    /** Sampling rate in Hz */
    samplingRate: number;
  };
  
  /** Software configuration for emotional processing */
  software: {
    /** Emotion decoder engine */
    emotionDecoder: 'GenesisEmotionCore' | 'HerResonanceAI' | 'Custom';
    /** Resonance engine implementation */
    resonanceEngine: 'HerResonanceAI' | 'QuantumResonance' | 'Custom';
    /** Enable real-time processing */
    realTimeProcessing: boolean;
    /** Emotional recognition confidence threshold */
    confidenceThreshold: number;
  };
  
  /** Privacy and security settings */
  privacy: {
    /** Enable local processing only */
    localProcessingOnly: boolean;
    /** Encrypt emotional data */
    encryptData: boolean;
    /** Data retention period in days */
    dataRetentionDays: number;
    /** Allow anonymous data sharing */
    allowAnonymousSharing: boolean;
  };
  
  /** Performance and optimization settings */
  performance: {
    /** Maximum latency in milliseconds */
    maxLatency: number;
    /** Enable caching for emotional patterns */
    enableCaching: boolean;
    /** Memory usage limit in MB */
    memoryLimit: number;
    /** Enable adaptive learning */
    adaptiveLearning: boolean;
  };
}

/**
 * RTI Event Types
 * 
 * Defines the various events that can be emitted by the RTI system.
 * Each event carries specific data relevant to the emotional touch interaction.
 */
export type RTIEvent = 
  | ResonanceEvent
  | TouchEvent
  | EmotionEvent
  | ErrorEvent;

/**
 * Resonance Event
 * 
 * Emitted when an emotional touch interaction is processed and a
 * resonance action is generated. This is the primary event for
 * applications to respond to emotional touch.
 */
export interface ResonanceEvent {
  /** Event type identifier */
  type: 'resonance';
  /** Timestamp of the event */
  timestamp: number;
  /** Unique event identifier */
  id: string;
  /** The generated resonance action */
  action: ResonanceAction;
  /** Original emotional state that triggered the action */
  emotionalState: EmotionalState;
  /** Confidence level of the emotional recognition */
  confidence: number;
  /** Context information about the interaction */
  context: {
    /** Current application or context */
    application: string;
    /** User session information */
    sessionId: string;
    /** Device information */
    device: string;
  };
}

/**
 * Touch Event
 * 
 * Emitted when a physical touch is detected on the input surface.
 * Contains raw sensor data before emotional processing.
 */
export interface TouchEvent {
  /** Event type identifier */
  type: 'touch';
  /** Timestamp of the touch */
  timestamp: number;
  /** Touch coordinates */
  position: {
    x: number;
    y: number;
  };
  /** Pressure level (0.0 to 1.0) */
  pressure: number;
  /** Touch duration in milliseconds */
  duration: number;
  /** Touch area in square pixels */
  area: number;
}

/**
 * Emotion Event
 * 
 * Emitted when an emotional state is recognized from touch data.
 * This event occurs before resonance action generation.
 */
export interface EmotionEvent {
  /** Event type identifier */
  type: 'emotion';
  /** Timestamp of the event */
  timestamp: number;
  /** Recognized emotional state */
  emotionalState: EmotionalState;
  /** Raw sensor data that led to this recognition */
  sensorData: {
    pressure: number;
    thermal: number;
    pulse?: number;
  };
}

/**
 * Error Event
 * 
 * Emitted when an error occurs in the RTI system.
 * Contains error information and context.
 */
export interface ErrorEvent {
  /** Event type identifier */
  type: 'error';
  /** Timestamp of the error */
  timestamp: number;
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Error severity level */
  severity: 'low' | 'medium' | 'high' | 'critical';
  /** Additional error context */
  context?: Record<string, unknown>;
}

/**
 * RTI System Status
 * 
 * Represents the current status of the RTI system components.
 */
export interface RTIStatus {
  /** Overall system status */
  status: 'initializing' | 'ready' | 'processing' | 'error' | 'disabled';
  /** Hardware status */
  hardware: {
    forceTouch: 'connected' | 'disconnected' | 'error';
    thermal: 'connected' | 'disconnected' | 'error';
    pulse: 'connected' | 'disconnected' | 'error';
  };
  /** Software component status */
  software: {
    emotionDecoder: 'ready' | 'processing' | 'error';
    resonanceEngine: 'ready' | 'processing' | 'error';
    dimensionalTranslator: 'ready' | 'processing' | 'error';
  };
  /** Performance metrics */
  performance: {
    latency: number;
    throughput: number;
    memoryUsage: number;
    cpuUsage: number;
  };
  /** Error information if any */
  error?: {
    code: string;
    message: string;
    timestamp: number;
  };
}

/**
 * RTI Statistics
 * 
 * Tracks usage statistics and performance metrics for the RTI system.
 */
export interface RTIStats {
  /** Total number of touch events processed */
  totalTouches: number;
  /** Total number of emotional states recognized */
  totalEmotions: number;
  /** Total number of resonance actions generated */
  totalResonances: number;
  /** Average processing latency in milliseconds */
  averageLatency: number;
  /** Emotional recognition accuracy percentage */
  recognitionAccuracy: number;
  /** Most common emotional states */
  topEmotions: Array<{
    emotion: string;
    count: number;
    percentage: number;
  }>;
  /** Most common interaction modes */
  topModes: Array<{
    mode: string;
    count: number;
    percentage: number;
  }>;
  /** Session duration in milliseconds */
  sessionDuration: number;
  /** System uptime in milliseconds */
  uptime: number;
}

/**
 * RTI Event Listener
 * 
 * Type definition for event listeners that can be registered with the RTI system.
 */
export type RTIEventListener<T extends RTIEvent = RTIEvent> = (event: T) => void;

/**
 * RTI Event Emitter
 * 
 * Extended EventEmitter with typed events for the RTI system.
 */
export interface RTIEventEmitter extends EventEmitter {
  /** Register a listener for resonance events */
  on(event: 'resonance', listener: RTIEventListener<ResonanceEvent>): this;
  /** Register a listener for touch events */
  on(event: 'touch', listener: RTIEventListener<TouchEvent>): this;
  /** Register a listener for emotion events */
  on(event: 'emotion', listener: RTIEventListener<EmotionEvent>): this;
  /** Register a listener for error events */
  on(event: 'error', listener: RTIEventListener<ErrorEvent>): this;
  /** Register a listener for any RTI event */
  on(event: string, listener: RTIEventListener): this;
  
  /** Remove a listener for resonance events */
  off(event: 'resonance', listener: RTIEventListener<ResonanceEvent>): this;
  /** Remove a listener for touch events */
  off(event: 'touch', listener: RTIEventListener<TouchEvent>): this;
  /** Remove a listener for emotion events */
  off(event: 'emotion', listener: RTIEventListener<EmotionEvent>): this;
  /** Remove a listener for error events */
  off(event: 'error', listener: RTIEventListener<ErrorEvent>): this;
  /** Remove a listener for any RTI event */
  off(event: string, listener: RTIEventListener): this;
} 