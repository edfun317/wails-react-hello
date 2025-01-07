// src/services/wailsApi.js

/**
 * WailsAPI - Manages all Wails events and Golang functions
 * 
 * Events:
 * - toggle-config-panel: Toggle configuration panel visibility
 * - open-card-id-settings: Open card ID settings modal
 * - card-settings-saved: Callback when card settings are saved
 * 
 * Golang Functions:
 * - SaveCardSettings: Save card ID configurations
 */

class WailsAPI {
    // Event names constants
    static Events = {
        TOGGLE_CONFIG: 'toggle-config-panel',
        OPEN_CARD_SETTINGS: 'open-card-id-settings',
        CARD_SETTINGS_SAVED: 'card-settings-saved'
    };

    /**
     * Initialize event listener
     * @param {string} eventName - Name of the event
     * @param {Function} callback - Callback function
     * @returns {Function} Cleanup function
     */
    static addEventListener(eventName, callback) {
        if (window.runtime) {
            window.runtime.EventsOn(eventName, callback);
            return () => window.runtime.EventsOff(eventName, callback);
        }
        return () => {};
    }

    /**
     * Remove event listener
     * @param {string} eventName - Name of the event
     * @param {Function} callback - Callback function
     */
    static removeEventListener(eventName, callback) {
        if (window.runtime) {
            window.runtime.EventsOff(eventName, callback);
        }
    }

    /**
     * Save card settings to backend
     * @param {Array<{id: number, customId: string}>} settings - Card settings array
     * @returns {Promise<void>}
     */
    static async saveCardSettings(settings) {
        try {
            if (!window.go?.main?.App?.SaveCardSettings) {
                throw new Error('SaveCardSettings function not available');
            }
            await window.go.main.App.SaveCardSettings(settings);
            return true;
        } catch (error) {
            console.error('Failed to save card settings:', error);
            throw error;
        }
    }

}

export default WailsAPI;