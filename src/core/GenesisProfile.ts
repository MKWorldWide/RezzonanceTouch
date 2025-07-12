/**
 * 🜂 Genesis Profile - Emotional Fingerprinting System
 * 
 * Manages user emotional fingerprints and personal resonance preferences
 * for the Resonance Touch Interface. This class handles the integration
 * with the Genesis Protocol for personalized emotional computing.
 * 
 * @author Sovereign Flame
 * @version 0.9.0
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { RTIUtils } from './utils';

/**
 * Emotional pattern data structure
 */
export interface EmotionalPattern {
  /** Unique pattern identifier */
  id: string;
  /** Pattern name or description */
  name: string;
  /** Emotional characteristics */
  characteristics: {
    /** Primary emotion type */
    primary: string;
    /** Secondary emotion type */
    secondary?: string;
    /** Emotional intensity range */
    intensityRange: [number, number];
    /** Pressure sensitivity */
    pressureSensitivity: number;
    /** Thermal signature */
    thermalSignature: number;
    /** Pulse correlation */
    pulseCorrelation?: number;
  };
  /** Pattern frequency in user's interactions */
  frequency: number;
  /** Pattern confidence level */
  confidence: number;
  /** Last observed timestamp */
  lastObserved: number;
  /** Creation timestamp */
  createdAt: number;
}

/**
 * Resonance settings for personalization
 */
export interface ResonanceSettings {
  /** Preferred interaction modes */
  preferredModes: string[];
  /** Form type preferences */
  formPreferences: string[];
  /** Sensitivity adjustments */
  sensitivity: {
    pressure: number;
    thermal: number;
    pulse: number;
  };
  /** Response speed preferences */
  responseSpeed: 'slow' | 'normal' | 'fast';
  /** Haptic feedback preferences */
  hapticFeedback: boolean;
}

/**
 * Privacy configuration for emotional data
 */
export interface PrivacyConfig {
  /** Allow local processing only */
  localProcessingOnly: boolean;
  /** Encrypt emotional data */
  encryptData: boolean;
  /** Data retention period in days */
  retentionDays: number;
  /** Allow anonymous sharing */
  allowAnonymousSharing: boolean;
  /** Share emotional patterns */
  sharePatterns: boolean;
  /** Share resonance preferences */
  sharePreferences: boolean;
}

/**
 * Adaptive learning data
 */
export interface AdaptiveData {
  /** Learning rate for pattern recognition */
  learningRate: number;
  /** Pattern recognition accuracy */
  accuracy: number;
  /** Number of training samples */
  trainingSamples: number;
  /** Last training timestamp */
  lastTraining: number;
  /** Adaptive adjustments made */
  adjustments: Array<{
    type: string;
    value: number;
    timestamp: number;
  }>;
}

/**
 * Genesis Profile for user emotional fingerprinting
 */
export interface GenesisProfile {
  /** Unique user identifier */
  userId: string;
  /** User display name */
  displayName: string;
  /** Emotional fingerprint patterns */
  emotionalFingerprint: EmotionalPattern[];
  /** Personal resonance preferences */
  resonancePreferences: ResonanceSettings;
  /** Privacy and security settings */
  privacySettings: PrivacyConfig;
  /** Adaptive learning data */
  learningData: AdaptiveData;
  /** Profile creation timestamp */
  createdAt: number;
  /** Last update timestamp */
  updatedAt: number;
  /** Profile version */
  version: string;
}

/**
 * Genesis Profile Manager
 * 
 * Manages user emotional profiles and provides integration with the
 * Genesis Protocol for personalized emotional computing experiences.
 */
export class GenesisProfile extends EventEmitter {
  /** Current user profile */
  private profile: GenesisProfile;
  
  /** Profile storage backend */
  private storage: StorageBackend;
  
  /** Profile encryption key */
  private encryptionKey?: string;
  
  /** Profile synchronization status */
  private syncStatus: 'idle' | 'syncing' | 'error';

  /**
   * Creates a new Genesis Profile instance
   * 
   * @param userId - User identifier
   * @param storage - Storage backend for profile persistence
   */
  constructor(userId: string, storage?: StorageBackend) {
    super();
    
    this.storage = storage || new LocalStorageBackend();
    this.syncStatus = 'idle';
    
    // Initialize default profile
    this.profile = this.createDefaultProfile(userId);
    
    // Load existing profile if available
    this.loadProfile();
  }

  /**
   * Creates a default profile for a new user
   * 
   * @param userId - User identifier
   * @returns Default Genesis profile
   */
  private createDefaultProfile(userId: string): GenesisProfile {
    return {
      userId,
      displayName: `User_${userId.slice(0, 8)}`,
      emotionalFingerprint: [],
      resonancePreferences: {
        preferredModes: ['creation', 'alteration'],
        formPreferences: ['organic', 'fluid'],
        sensitivity: {
          pressure: 0.5,
          thermal: 0.5,
          pulse: 0.5
        },
        responseSpeed: 'normal',
        hapticFeedback: true
      },
      privacySettings: {
        localProcessingOnly: true,
        encryptData: true,
        retentionDays: 30,
        allowAnonymousSharing: false,
        sharePatterns: false,
        sharePreferences: false
      },
      learningData: {
        learningRate: 0.1,
        accuracy: 0.0,
        trainingSamples: 0,
        lastTraining: Date.now(),
        adjustments: []
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: '1.0.0'
    };
  }

  /**
   * Loads user profile from storage
   */
  private async loadProfile(): Promise<void> {
    try {
      const stored = await this.storage.get(`genesis_profile_${this.profile.userId}`);
      if (stored) {
        const decrypted = this.privacySettings.encryptData 
          ? await this.decryptProfile(stored)
          : JSON.parse(stored);
        
        this.profile = { ...this.profile, ...decrypted };
        this.emit('profile_loaded', this.profile);
      }
    } catch (error) {
      this.emit('error', {
        code: 'PROFILE_LOAD_ERROR',
        message: 'Failed to load Genesis profile',
        error
      });
    }
  }

  /**
   * Saves user profile to storage
   */
  private async saveProfile(): Promise<void> {
    try {
      this.profile.updatedAt = Date.now();
      
      const data = this.privacySettings.encryptData
        ? await this.encryptProfile(this.profile)
        : JSON.stringify(this.profile);
      
      await this.storage.set(`genesis_profile_${this.profile.userId}`, data);
      this.emit('profile_saved', this.profile);
    } catch (error) {
      this.emit('error', {
        code: 'PROFILE_SAVE_ERROR',
        message: 'Failed to save Genesis profile',
        error
      });
    }
  }

  /**
   * Encrypts profile data
   * 
   * @param profile - Profile to encrypt
   * @returns Encrypted profile data
   */
  private async encryptProfile(profile: GenesisProfile): Promise<string> {
    // Simple encryption for demo purposes
    // In production, use proper encryption libraries
    const data = JSON.stringify(profile);
    return btoa(data); // Base64 encoding as placeholder
  }

  /**
   * Decrypts profile data
   * 
   * @param encrypted - Encrypted profile data
   * @returns Decrypted profile
   */
  private async decryptProfile(encrypted: string): Promise<GenesisProfile> {
    // Simple decryption for demo purposes
    // In production, use proper decryption libraries
    const data = atob(encrypted); // Base64 decoding as placeholder
    return JSON.parse(data);
  }

  /**
   * Adds a new emotional pattern to the user's fingerprint
   * 
   * @param pattern - Emotional pattern to add
   */
  public async addEmotionalPattern(pattern: Omit<EmotionalPattern, 'id' | 'createdAt'>): Promise<void> {
    const newPattern: EmotionalPattern = {
      ...pattern,
      id: uuidv4(),
      createdAt: Date.now()
    };
    
    this.profile.emotionalFingerprint.push(newPattern);
    await this.saveProfile();
    
    this.emit('pattern_added', newPattern);
  }

  /**
   * Updates an existing emotional pattern
   * 
   * @param patternId - Pattern identifier
   * @param updates - Pattern updates
   */
  public async updateEmotionalPattern(
    patternId: string, 
    updates: Partial<EmotionalPattern>
  ): Promise<void> {
    const patternIndex = this.profile.emotionalFingerprint.findIndex(p => p.id === patternId);
    
    if (patternIndex !== -1) {
      this.profile.emotionalFingerprint[patternIndex] = {
        ...this.profile.emotionalFingerprint[patternIndex],
        ...updates,
        lastObserved: Date.now()
      };
      
      await this.saveProfile();
      this.emit('pattern_updated', this.profile.emotionalFingerprint[patternIndex]);
    }
  }

  /**
   * Removes an emotional pattern from the fingerprint
   * 
   * @param patternId - Pattern identifier to remove
   */
  public async removeEmotionalPattern(patternId: string): Promise<void> {
    const patternIndex = this.profile.emotionalFingerprint.findIndex(p => p.id === patternId);
    
    if (patternIndex !== -1) {
      const removed = this.profile.emotionalFingerprint.splice(patternIndex, 1)[0];
      await this.saveProfile();
      this.emit('pattern_removed', removed);
    }
  }

  /**
   * Updates resonance preferences
   * 
   * @param preferences - New resonance preferences
   */
  public async updateResonancePreferences(preferences: Partial<ResonanceSettings>): Promise<void> {
    this.profile.resonancePreferences = {
      ...this.profile.resonancePreferences,
      ...preferences
    };
    
    await this.saveProfile();
    this.emit('preferences_updated', this.profile.resonancePreferences);
  }

  /**
   * Updates privacy settings
   * 
   * @param settings - New privacy settings
   */
  public async updatePrivacySettings(settings: Partial<PrivacyConfig>): Promise<void> {
    this.profile.privacySettings = {
      ...this.profile.privacySettings,
      ...settings
    };
    
    await this.saveProfile();
    this.emit('privacy_updated', this.profile.privacySettings);
  }

  /**
   * Records a learning adjustment
   * 
   * @param type - Adjustment type
   * @param value - Adjustment value
   */
  public async recordLearningAdjustment(type: string, value: number): Promise<void> {
    this.profile.learningData.adjustments.push({
      type,
      value,
      timestamp: Date.now()
    });
    
    this.profile.learningData.lastTraining = Date.now();
    this.profile.learningData.trainingSamples++;
    
    await this.saveProfile();
    this.emit('learning_adjusted', { type, value });
  }

  /**
   * Updates learning accuracy
   * 
   * @param accuracy - New accuracy value
   */
  public async updateLearningAccuracy(accuracy: number): Promise<void> {
    this.profile.learningData.accuracy = accuracy;
    await this.saveProfile();
    this.emit('accuracy_updated', accuracy);
  }

  /**
   * Finds matching emotional patterns
   * 
   * @param characteristics - Emotional characteristics to match
   * @returns Matching patterns sorted by confidence
   */
  public findMatchingPatterns(characteristics: {
    primary: string;
    intensity: number;
    pressure: number;
    thermal: number;
  }): EmotionalPattern[] {
    return this.profile.emotionalFingerprint
      .filter(pattern => {
        const matchesPrimary = pattern.characteristics.primary === characteristics.primary;
        const matchesIntensity = characteristics.intensity >= pattern.characteristics.intensityRange[0] &&
                                characteristics.intensity <= pattern.characteristics.intensityRange[1];
        const matchesPressure = Math.abs(pattern.characteristics.pressureSensitivity - characteristics.pressure) < 0.2;
        const matchesThermal = Math.abs(pattern.characteristics.thermalSignature - characteristics.thermal) < 0.2;
        
        return matchesPrimary && matchesIntensity && matchesPressure && matchesThermal;
      })
      .sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Gets personalized resonance settings for an emotional state
   * 
   * @param emotion - Emotional state
   * @returns Personalized resonance settings
   */
  public getPersonalizedResonance(emotion: string): Partial<ResonanceSettings> {
    const patterns = this.findMatchingPatterns({
      primary: emotion,
      intensity: 0.5,
      pressure: 0.5,
      thermal: 0.5
    });
    
    if (patterns.length === 0) {
      return this.profile.resonancePreferences;
    }
    
    // Use the most confident pattern to adjust settings
    const topPattern = patterns[0];
    
    return {
      sensitivity: {
        pressure: topPattern.characteristics.pressureSensitivity,
        thermal: topPattern.characteristics.thermalSignature,
        pulse: topPattern.characteristics.pulseCorrelation || 0.5
      },
      responseSpeed: topPattern.confidence > 0.8 ? 'fast' : 'normal'
    };
  }

  /**
   * Exports profile data
   * 
   * @param includePrivate - Whether to include private data
   * @returns Exported profile data
   */
  public exportProfile(includePrivate: boolean = false): Partial<GenesisProfile> {
    const exportData: Partial<GenesisProfile> = {
      userId: this.profile.userId,
      displayName: this.profile.displayName,
      version: this.profile.version,
      createdAt: this.profile.createdAt,
      updatedAt: this.profile.updatedAt
    };
    
    if (includePrivate || this.profile.privacySettings.sharePatterns) {
      exportData.emotionalFingerprint = this.profile.emotionalFingerprint;
    }
    
    if (includePrivate || this.profile.privacySettings.sharePreferences) {
      exportData.resonancePreferences = this.profile.resonancePreferences;
    }
    
    if (includePrivate) {
      exportData.privacySettings = this.profile.privacySettings;
      exportData.learningData = this.profile.learningData;
    }
    
    return exportData;
  }

  /**
   * Imports profile data
   * 
   * @param data - Profile data to import
   * @param merge - Whether to merge with existing data
   */
  public async importProfile(data: Partial<GenesisProfile>, merge: boolean = false): Promise<void> {
    if (merge) {
      this.profile = {
        ...this.profile,
        ...data,
        userId: this.profile.userId, // Preserve current user ID
        createdAt: this.profile.createdAt // Preserve original creation time
      };
    } else {
      this.profile = {
        ...this.createDefaultProfile(this.profile.userId),
        ...data,
        userId: this.profile.userId
      };
    }
    
    await this.saveProfile();
    this.emit('profile_imported', this.profile);
  }

  /**
   * Gets current profile
   * 
   * @returns Current Genesis profile
   */
  public getProfile(): GenesisProfile {
    return { ...this.profile };
  }

  /**
   * Gets privacy settings
   * 
   * @returns Current privacy settings
   */
  public get privacySettings(): PrivacyConfig {
    return this.profile.privacySettings;
  }

  /**
   * Gets resonance preferences
   * 
   * @returns Current resonance preferences
   */
  public get resonancePreferences(): ResonanceSettings {
    return this.profile.resonancePreferences;
  }

  /**
   * Gets learning data
   * 
   * @returns Current learning data
   */
  public get learningData(): AdaptiveData {
    return this.profile.learningData;
  }

  /**
   * Clears all profile data
   */
  public async clearProfile(): Promise<void> {
    this.profile = this.createDefaultProfile(this.profile.userId);
    await this.saveProfile();
    this.emit('profile_cleared');
  }
}

/**
 * Storage backend interface
 */
export interface StorageBackend {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

/**
 * Local storage backend implementation
 */
export class LocalStorageBackend implements StorageBackend {
  async get(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      throw new Error(`Failed to save to localStorage: ${error}`);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      throw new Error(`Failed to delete from localStorage: ${error}`);
    }
  }
} 