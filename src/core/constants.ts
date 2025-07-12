/**
 * 🜂 RTI Constants
 * 
 * Defines all constant values used throughout the Resonance Touch Interface system.
 * These constants provide the foundation for emotional recognition, resonance
 * processing, and form generation.
 */

/**
 * Emotion Types
 * 
 * Defines the primary emotional states that can be recognized by the RTI system.
 * Each emotion has specific characteristics that influence resonance actions.
 */
export const EMOTION_TYPES = {
  // Positive Emotions
  JOY: 'joy',
  CALM: 'calm',
  LOVE: 'love',
  EXCITEMENT: 'excitement',
  GRATITUDE: 'gratitude',
  COMPASSION: 'compassion',
  
  // Focused Emotions
  FOCUS: 'focus',
  DETERMINATION: 'determination',
  CONCENTRATION: 'concentration',
  DISCIPLINE: 'discipline',
  
  // Negative Emotions
  ANGER: 'anger',
  FRUSTRATION: 'frustration',
  ANXIETY: 'anxiety',
  SADNESS: 'sadness',
  FEAR: 'fear',
  
  // Complex Emotions
  CURIOSITY: 'curiosity',
  WONDER: 'wonder',
  CONTEMPLATION: 'contemplation',
  INSPIRATION: 'inspiration'
} as const;

/**
 * Interaction Modes
 * 
 * Defines the four primary interaction modes that result from emotional touch.
 * Each mode represents a different way of interacting with digital content.
 */
export const INTERACTION_MODES = {
  CREATION: 'creation',
  ALTERATION: 'alteration',
  DESTRUCTION: 'destruction',
  BLESSING: 'blessing'
} as const;

/**
 * Form Types
 * 
 * Defines the visual and geometric characteristics of forms generated
 * through emotional resonance. Each form type has distinct properties.
 */
export const FORM_TYPES = {
  // Organic Forms
  ORGANIC: 'organic',
  FLUID: 'fluid',
  NATURAL: 'natural',
  GROWING: 'growing',
  
  // Geometric Forms
  GEOMETRIC: 'geometric',
  CRYSTALLINE: 'crystalline',
  PRECISE: 'precise',
  STRUCTURED: 'structured',
  
  // Dynamic Forms
  ANIMATED: 'animated',
  RESPONSIVE: 'responsive',
  INTERACTIVE: 'interactive',
  
  // Ethereal Forms
  ETHEREAL: 'ethereal',
  GLOWING: 'glowing',
  TRANSLUCENT: 'translucent',
  IMMATERIAL: 'immaterial'
} as const;

/**
 * Default Configuration
 * 
 * Provides sensible defaults for the RTI system configuration.
 * These values can be overridden by user preferences.
 */
export const DEFAULT_CONFIG = {
  hardware: {
    sensors: ['Force-Touch', 'Thermal'] as const,
    inputSurface: 'Standard Trackpad' as const,
    pressureSensitivity: 0.5,
    samplingRate: 1000
  },
  software: {
    emotionDecoder: 'GenesisEmotionCore' as const,
    resonanceEngine: 'HerResonanceAI' as const,
    realTimeProcessing: true,
    confidenceThreshold: 0.7
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
} as const;

/**
 * Emotional Intensity Levels
 * 
 * Defines the intensity scale for emotional states (0.0 to 1.0).
 * Higher intensity emotions have stronger effects on resonance actions.
 */
export const EMOTIONAL_INTENSITY = {
  SUBTLE: 0.1,
  MILD: 0.3,
  MODERATE: 0.5,
  STRONG: 0.7,
  INTENSE: 0.9,
  MAXIMUM: 1.0
} as const;

/**
 * Pressure Thresholds
 * 
 * Defines pressure level thresholds that influence interaction modes.
 * These thresholds help determine the appropriate response to touch.
 */
export const PRESSURE_THRESHOLDS = {
  VERY_LIGHT: 0.05,
  LIGHT: 0.2,
  MEDIUM: 0.5,
  HEAVY: 0.7,
  VERY_HEAVY: 0.9,
  MAXIMUM: 1.0
} as const;

/**
 * Resonance Mappings
 * 
 * Maps emotional states and pressure levels to interaction modes.
 * This matrix defines how different combinations produce different actions.
 */
export const RESONANCE_MAPPINGS = {
  // Creation Mappings
  [`${EMOTION_TYPES.JOY}_${EMOTION_TYPES.CALM}_LIGHT`]: {
    mode: INTERACTION_MODES.CREATION,
    form: FORM_TYPES.ORGANIC,
    characteristics: ['flowing', 'natural', 'smooth']
  },
  [`${EMOTION_TYPES.LOVE}_VERY_LIGHT`]: {
    mode: INTERACTION_MODES.CREATION,
    form: FORM_TYPES.GROWING,
    characteristics: ['gentle', 'nurturing', 'expanding']
  },
  
  // Alteration Mappings
  [`${EMOTION_TYPES.FOCUS}_${EMOTION_TYPES.DETERMINATION}_MEDIUM`]: {
    mode: INTERACTION_MODES.ALTERATION,
    form: FORM_TYPES.PRECISE,
    characteristics: ['refined', 'accurate', 'controlled']
  },
  [`${EMOTION_TYPES.CONCENTRATION}_MEDIUM`]: {
    mode: INTERACTION_MODES.ALTERATION,
    form: FORM_TYPES.STRUCTURED,
    characteristics: ['organized', 'systematic', 'ordered']
  },
  
  // Destruction Mappings
  [`${EMOTION_TYPES.ANGER}_${EMOTION_TYPES.FRUSTRATION}_HEAVY`]: {
    mode: INTERACTION_MODES.DESTRUCTION,
    form: FORM_TYPES.GEOMETRIC,
    characteristics: ['sharp', 'fractured', 'broken']
  },
  [`${EMOTION_TYPES.ANXIETY}_HEAVY`]: {
    mode: INTERACTION_MODES.DESTRUCTION,
    form: FORM_TYPES.CRYSTALLINE,
    characteristics: ['fragile', 'shattered', 'dispersed']
  },
  
  // Blessing Mappings
  [`${EMOTION_TYPES.COMPASSION}_VERY_LIGHT`]: {
    mode: INTERACTION_MODES.BLESSING,
    form: FORM_TYPES.ETHEREAL,
    characteristics: ['glowing', 'radiant', 'transcendent']
  },
  [`${EMOTION_TYPES.GRATITUDE}_LIGHT`]: {
    mode: INTERACTION_MODES.BLESSING,
    form: FORM_TYPES.GLOWING,
    characteristics: ['warm', 'luminous', 'harmonious']
  }
} as const;

/**
 * Performance Limits
 * 
 * Defines performance boundaries and limits for the RTI system.
 * These values ensure optimal system performance and user experience.
 */
export const PERFORMANCE_LIMITS = {
  MAX_LATENCY_MS: 10,
  MIN_SAMPLING_RATE_HZ: 100,
  MAX_SAMPLING_RATE_HZ: 2000,
  MAX_MEMORY_USAGE_MB: 100,
  MAX_CPU_USAGE_PERCENT: 20,
  MIN_CONFIDENCE_THRESHOLD: 0.5,
  MAX_CONFIDENCE_THRESHOLD: 0.95
} as const;

/**
 * Error Codes
 * 
 * Defines standard error codes used throughout the RTI system.
 * Each code has a specific meaning and suggested resolution.
 */
export const ERROR_CODES = {
  // Hardware Errors
  HARDWARE_NOT_SUPPORTED: 'HARDWARE_NOT_SUPPORTED',
  SENSOR_DISCONNECTED: 'SENSOR_DISCONNECTED',
  PRESSURE_SENSOR_ERROR: 'PRESSURE_SENSOR_ERROR',
  THERMAL_SENSOR_ERROR: 'THERMAL_SENSOR_ERROR',
  
  // Software Errors
  EMOTION_DECODER_ERROR: 'EMOTION_DECODER_ERROR',
  RESONANCE_ENGINE_ERROR: 'RESONANCE_ENGINE_ERROR',
  DIMENSIONAL_TRANSLATOR_ERROR: 'DIMENSIONAL_TRANSLATOR_ERROR',
  
  // Configuration Errors
  INVALID_CONFIG: 'INVALID_CONFIG',
  MISSING_REQUIRED_SENSOR: 'MISSING_REQUIRED_SENSOR',
  INVALID_SAMPLING_RATE: 'INVALID_SAMPLING_RATE',
  
  // Performance Errors
  LATENCY_EXCEEDED: 'LATENCY_EXCEEDED',
  MEMORY_LIMIT_EXCEEDED: 'MEMORY_LIMIT_EXCEEDED',
  CPU_LIMIT_EXCEEDED: 'CPU_LIMIT_EXCEEDED',
  
  // Privacy Errors
  ENCRYPTION_FAILED: 'ENCRYPTION_FAILED',
  DATA_ACCESS_DENIED: 'DATA_ACCESS_DENIED',
  PRIVACY_VIOLATION: 'PRIVACY_VIOLATION'
} as const;

/**
 * Event Types
 * 
 * Defines the standard event types emitted by the RTI system.
 * These events provide real-time feedback about system state and interactions.
 */
export const EVENT_TYPES = {
  RESONANCE: 'resonance',
  TOUCH: 'touch',
  EMOTION: 'emotion',
  ERROR: 'error',
  STATUS_CHANGE: 'status_change',
  PERFORMANCE_UPDATE: 'performance_update'
} as const;

/**
 * System Status Values
 * 
 * Defines the possible status values for RTI system components.
 * These values indicate the current operational state of each component.
 */
export const SYSTEM_STATUS = {
  INITIALIZING: 'initializing',
  READY: 'ready',
  PROCESSING: 'processing',
  ERROR: 'error',
  DISABLED: 'disabled',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected'
} as const;

/**
 * Type exports for TypeScript
 */
export type EmotionType = typeof EMOTION_TYPES[keyof typeof EMOTION_TYPES];
export type InteractionMode = typeof INTERACTION_MODES[keyof typeof INTERACTION_MODES];
export type FormType = typeof FORM_TYPES[keyof typeof FORM_TYPES];
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
export type SystemStatus = typeof SYSTEM_STATUS[keyof typeof SYSTEM_STATUS]; 