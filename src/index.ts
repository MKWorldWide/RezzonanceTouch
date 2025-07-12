/**
 * 🜂 Resonance Touch Interface (RTI)
 * 
 * Where Pressure Meets Presence
 * 
 * This is the main entry point for the Resonance Touch Interface library.
 * It provides a revolutionary tactile input system that fuses Apple's 
 * force-touch technology with emotional resonance computing.
 * 
 * @author Sovereign Flame
 * @version 0.9.0
 */

// Core RTI Engine
export { RTI } from './core/RTI';
export { RTIConfig, RTIEvent, ResonanceEvent } from './core/types';

// Hardware Layer (Force-Touch Core)
export { ForceTouchCore } from './hardware/ForceTouchCore';
export { SensorData, TouchEvent, PressureData } from './hardware/types';

// Emotion Intent Decoder
export { EmotionIntentDecoder } from './emotion/EmotionIntentDecoder';
export { 
  EmotionalState, 
  EmotionType, 
  EmotionalContext,
  EmotionRecognitionResult 
} from './emotion/types';

// Resonance Engine Layer
export { ResonanceEngine } from './resonance/ResonanceEngine';
export { 
  ResonanceAction, 
  InteractionMode, 
  FormType, 
  ResonanceData 
} from './resonance/types';

// Dimensional Translator
export { DimensionalTranslator } from './dimensional/DimensionalTranslator';
export { 
  MorphogeneticForm, 
  Geometry3D, 
  Material, 
  Animation 
} from './dimensional/types';

// Genesis Protocol Integration
export { GenesisProfile } from './core/GenesisProfile';

// Utilities
export { RTIUtils } from './core/utils';

// Constants
export { 
  EMOTION_TYPES, 
  INTERACTION_MODES, 
  FORM_TYPES,
  DEFAULT_CONFIG 
} from './core/constants';

/**
 * Default RTI instance for quick setup
 * 
 * Usage:
 * ```typescript
 * import { createRTI } from '@resonance-touch/core';
 * 
 * const rti = createRTI();
 * rti.on('resonance', (event) => {
 *   console.log('Emotional touch detected:', event);
 * });
 * ```
 */
export function createRTI(config?: Partial<RTIConfig>): RTI {
  return new RTI(config);
}

/**
 * Version information
 */
export const VERSION = '0.9.0';
export const BUILD_DATE = new Date().toISOString();

/**
 * Library metadata
 */
export const LIBRARY_INFO = {
  name: 'Resonance Touch Interface',
  version: VERSION,
  description: 'Where Pressure Meets Presence',
  author: 'Sovereign Flame',
  buildDate: BUILD_DATE,
  features: [
    'Force-touch integration',
    'Emotional intent recognition',
    'Resonance-based computing',
    '3D morphogenetic modeling',
    'Genesis Protocol integration'
  ]
};

// Re-export types for convenience
export type {
  RTIConfig,
  RTIEvent,
  ResonanceEvent,
  SensorData,
  TouchEvent,
  PressureData,
  EmotionalState,
  EmotionType,
  EmotionalContext,
  EmotionRecognitionResult,
  ResonanceAction,
  InteractionMode,
  FormType,
  ResonanceData,
  MorphogeneticForm,
  Geometry3D,
  Material,
  Animation,
  GenesisProfile
}; 