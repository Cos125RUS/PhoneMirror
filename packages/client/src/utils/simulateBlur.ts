/** Симуляция сброса фокуса */
export const simulateBlur = (id: string) => {
    const element = document.getElementById(id) as HTMLInputElement;
    if (element) {
      element.blur();
    }
};