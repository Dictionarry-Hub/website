import { writable } from 'svelte/store';

export interface FlowchartState {
  selections: Record<number, number>;
  currentColumn: number;
}

function createFlowchartStore() {
  const { subscribe, set, update } = writable<FlowchartState>({
    selections: {},
    currentColumn: 1
  });

  return {
    subscribe,
    selectButton: (column: number, button: number) => {
      update(state => {
        const newSelections = { ...state.selections };
        
        // If clicking the already selected button, unselect it
        if (newSelections[column] === button) {
          delete newSelections[column];
          
          // Remove all selections after this column
          for (let i = column + 1; i <= 5; i++) {
            delete newSelections[i];
          }
          
          // Update current column to show only up to this column
          return {
            selections: newSelections,
            currentColumn: column
          };
        } else {
          // Select the button
          newSelections[column] = button;
          
          // Remove all selections after this column
          for (let i = column + 1; i <= 5; i++) {
            delete newSelections[i];
          }
          
          return {
            selections: newSelections,
            currentColumn: Math.min(column + 1, 5)
          };
        }
      });
    },
    reset: () => {
      set({
        selections: {},
        currentColumn: 1
      });
    }
  };
}

export const flowchartStore = createFlowchartStore();