import {fireEvent} from "@testing-library/react";

/** Симуляция клика по элементу */
export const simulateClick = (id: string) => {
    const element = document.getElementById(id) as HTMLInputElement;
    if (element) {
        fireEvent.click(element);
    }
};