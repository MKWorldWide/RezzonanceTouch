/**
 * 🜂 RTI Utilities
 * 
 * Utility functions for the Resonance Touch Interface system.
 * These functions provide common operations like configuration merging,
 * validation, and helper functions used throughout the RTI system.
 * 
 * @author Sovereign Flame
 * @version 0.9.0
 */

import { randomUUID } from 'crypto';
import { RTIConfig } from './types';
import { PERFORMANCE_LIMITS } from './constants';

/**
 * Utility class containing helper functions for the RTI system
 */
export class RTIUtils {
  /**
   * Merges configuration objects with deep merging support
   * 
   * @param base - Base configuration object
   * @param override - Configuration overrides to apply
   * @returns Merged configuration object
   */
  public static mergeConfig(base: RTIConfig, override?: Partial<RTIConfig>): RTIConfig {
    if (!override) return { ...base };
    
    const merged = { ...base };
    
    // Merge hardware configuration
    if (override.hardware) {
      merged.hardware = {
        ...merged.hardware,
        ...override.hardware
      };
    }
    
    // Merge software configuration
    if (override.software) {
      merged.software = {
        ...merged.software,
        ...override.software
      };
    }
    
    // Merge privacy configuration
    if (override.privacy) {
      merged.privacy = {
        ...merged.privacy,
        ...override.privacy
      };
    }
    
    // Merge performance configuration
    if (override.performance) {
      merged.performance = {
        ...merged.performance,
        ...override.performance
      };
    }
    
    return merged;
  }

  /**
   * Validates RTI configuration for correctness and performance limits
   * 
   * @param config - Configuration to validate
   * @returns Validation result with errors if any
   */
  public static validateConfig(config: RTIConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validate hardware configuration
    if (config.hardware.samplingRate < PERFORMANCE_LIMITS.MIN_SAMPLING_RATE_HZ) {
      errors.push(`Sampling rate must be at least ${PERFORMANCE_LIMITS.MIN_SAMPLING_RATE_HZ} Hz`);
    }
    
    if (config.hardware.samplingRate > PERFORMANCE_LIMITS.MAX_SAMPLING_RATE_HZ) {
      errors.push(`Sampling rate must not exceed ${PERFORMANCE_LIMITS.MAX_SAMPLING_RATE_HZ} Hz`);
    }
    
    if (config.hardware.pressureSensitivity < 0 || config.hardware.pressureSensitivity > 1) {
      errors.push('Pressure sensitivity must be between 0.0 and 1.0');
    }
    
    // Validate software configuration
    if (config.software.confidenceThreshold < PERFORMANCE_LIMITS.MIN_CONFIDENCE_THRESHOLD) {
      errors.push(`Confidence threshold must be at least ${PERFORMANCE_LIMITS.MIN_CONFIDENCE_THRESHOLD}`);
    }
    
    if (config.software.confidenceThreshold > PERFORMANCE_LIMITS.MAX_CONFIDENCE_THRESHOLD) {
      errors.push(`Confidence threshold must not exceed ${PERFORMANCE_LIMITS.MAX_CONFIDENCE_THRESHOLD}`);
    }
    
    // Validate performance configuration
    if (config.performance.maxLatency > PERFORMANCE_LIMITS.MAX_LATENCY_MS) {
      errors.push(`Maximum latency must not exceed ${PERFORMANCE_LIMITS.MAX_LATENCY_MS} ms`);
    }
    
    if (config.performance.memoryLimit > PERFORMANCE_LIMITS.MAX_MEMORY_USAGE_MB) {
      errors.push(`Memory limit must not exceed ${PERFORMANCE_LIMITS.MAX_MEMORY_USAGE_MB} MB`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Normalizes pressure values to a 0.0-1.0 range
   * 
   * @param pressure - Raw pressure value
   * @param min - Minimum pressure value
   * @param max - Maximum pressure value
   * @returns Normalized pressure value
   */
  public static normalizePressure(pressure: number, min: number = 0, max: number = 500): number {
    const normalized = (pressure - min) / (max - min);
    return Math.max(0, Math.min(1, normalized));
  }

  /**
   * Calculates emotional intensity from multiple factors
   * 
   * @param pressure - Normalized pressure (0.0-1.0)
   * @param thermal - Thermal reading (0.0-1.0)
   * @param pulse - Optional pulse reading (0.0-1.0)
   * @returns Calculated emotional intensity (0.0-1.0)
   */
  public static calculateEmotionalIntensity(
    pressure: number, 
    thermal: number, 
    pulse?: number
  ): number {
    // Base intensity from pressure
    let intensity = pressure * 0.6;
    
    // Add thermal contribution
    intensity += thermal * 0.3;
    
    // Add pulse contribution if available
    if (pulse !== undefined) {
      intensity += pulse * 0.1;
    }
    
    return Math.max(0, Math.min(1, intensity));
  }

  /**
   * Generates a unique identifier for events
   * 
   * @param prefix - Optional prefix for the ID
   * @returns Unique identifier string
   */
  public static generateId(prefix?: string): string {
    // Use cryptographically secure random UUID to avoid collisions
    const id = randomUUID();
    return prefix ? `${prefix}-${id}` : id;
  }

  /**
   * Debounces function calls to prevent excessive execution
   * 
   * @param func - Function to debounce
   * @param delay - Delay in milliseconds
   * @returns Debounced function
   */
  public static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  /**
   * Throttles function calls to limit execution frequency
   * 
   * @param func - Function to throttle
   * @param limit - Maximum calls per second
   * @returns Throttled function
   */
  public static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, 1000 / limit);
      }
    };
  }

  /**
   * Calculates distance between two points
   * 
   * @param x1 - First point X coordinate
   * @param y1 - First point Y coordinate
   * @param x2 - Second point X coordinate
   * @param y2 - Second point Y coordinate
   * @returns Distance between points
   */
  public static calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Interpolates between two values
   * 
   * @param start - Start value
   * @param end - End value
   * @param factor - Interpolation factor (0.0-1.0)
   * @returns Interpolated value
   */
  public static interpolate(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
  }

  /**
   * Clamps a value between minimum and maximum bounds
   * 
   * @param value - Value to clamp
   * @param min - Minimum bound
   * @param max - Maximum bound
   * @returns Clamped value
   */
  public static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Converts degrees to radians
   * 
   * @param degrees - Angle in degrees
   * @returns Angle in radians
   */
  public static degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Converts radians to degrees
   * 
   * @param radians - Angle in radians
   * @returns Angle in degrees
   */
  public static radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  /**
   * Formats a duration in milliseconds to a human-readable string
   * 
   * @param ms - Duration in milliseconds
   * @returns Formatted duration string
   */
  public static formatDuration(ms: number): string {
    if (ms < 1000) return `${ms.toFixed(1)}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
    return `${(ms / 3600000).toFixed(1)}h`;
  }

  /**
   * Formats a file size in bytes to a human-readable string
   * 
   * @param bytes - Size in bytes
   * @returns Formatted size string
   */
  public static formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  /**
   * Creates a deep copy of an object
   * 
   * @param obj - Object to copy
   * @returns Deep copy of the object
   */
  public static deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    if (obj instanceof Date) {
      return new Date(obj.getTime()) as T;
    }
    
    if (obj instanceof Array) {
      return obj.map(item => RTIUtils.deepCopy(item)) as T;
    }
    
    if (typeof obj === 'object') {
      const copied = {} as T;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          copied[key] = RTIUtils.deepCopy(obj[key]);
        }
      }
      return copied;
    }
    
    return obj;
  }

  /**
   * Checks if two objects are deeply equal
   * 
   * @param obj1 - First object
   * @param obj2 - Second object
   * @returns True if objects are deeply equal
   */
  public static deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    
    if (obj1 === null || obj2 === null) return false;
    if (typeof obj1 !== typeof obj2) return false;
    
    if (typeof obj1 !== 'object') return obj1 === obj2;
    
    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() === obj2.getTime();
    }
    
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      for (let i = 0; i < obj1.length; i++) {
        if (!RTIUtils.deepEqual(obj1[i], obj2[i])) return false;
      }
      return true;
    }
    
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!RTIUtils.deepEqual(obj1[key], obj2[key])) return false;
    }
    
    return true;
  }

  /**
   * Generates a random number between min and max
   * 
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Random number
   */
  public static random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Generates a random integer between min and max (inclusive)
   * 
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Random integer
   */
  public static randomInt(min: number, max: number): number {
    return Math.floor(RTIUtils.random(min, max + 1));
  }

  /**
   * Sleeps for a specified duration
   * 
   * @param ms - Duration in milliseconds
   * @returns Promise that resolves after the duration
   */
  public static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retries a function with exponential backoff
   * 
   * @param func - Function to retry
   * @param maxRetries - Maximum number of retries
   * @param baseDelay - Base delay in milliseconds
   * @returns Promise that resolves with the function result
   */
  public static async retry<T>(
    func: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await func();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        const delay = baseDelay * Math.pow(2, attempt);
        await RTIUtils.sleep(delay);
      }
    }
    
    throw lastError!;
  }
} 