import {fireEvent} from "@testing-library/react";

/** Симуляция ввода текста */
export const simulateInput = (id: string, text: string) => {
    const element = document.getElementById(id) as HTMLInputElement;
    if (element) {
        fireEvent.change(element, {target: {value: text}});
        fireEvent.input(element, {target: {value: text}});
    }
};