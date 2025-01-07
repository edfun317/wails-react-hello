import React, { useState, useEffect } from 'react';
import WailsAPI from '../../services/wailsApi';

const CardIdSettings = ({ cards, setCards, onClose }) => {
    const [editedCards, setEditedCards] = useState(cards);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Setup event listener for save completion
        const cleanup = WailsAPI.addEventListener(
            WailsAPI.Events.CARD_SETTINGS_SAVED,
            (success) => {
                if (success) {
                    setIsSaving(false);
                    setCards(editedCards);
                    onClose();
                }
            }
        );

        // Cleanup on unmount
        return cleanup;
    }, [editedCards, setCards, onClose]);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError('');

            const settingsData = editedCards.map(card => ({
                id: card.id,
                customId: card.customId
            }));

            await WailsAPI.saveCardSettings(settingsData);
        } catch (err) {
            console.error('Save settings failed:', err);
            setError('Failed to save settings: ' + err.message);
            setIsSaving(false);
        }
    };

  const handleCardIdChange = (id, newCustomId) => {
    setEditedCards(cards.map(card => 
      card.id === id ? { ...card, customId: newCustomId } : card
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">卡片 ID 設定</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {editedCards.map(card => (
            <div key={card.id} className="flex items-center gap-4">
              <span className="w-20">Card {card.id}:</span>
              <input
                type="text"
                value={card.customId}
                onChange={(e) => handleCardIdChange(card.id, e.target.value)}
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                disabled={isSaving}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
            disabled={isSaving}
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 ${
              isSaving ? 'cursor-not-allowed' : ''
            }`}
            disabled={isSaving}
          >
            {isSaving ? '儲存中...' : '儲存'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardIdSettings;