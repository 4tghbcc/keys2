class Counter {
    constructor() {
        this.count = 0;
        this.maxLimit = 10;
        this.minLimit = -10;
        
        this.elements = {
            result: document.getElementById('result'),
            incrementBtn: document.getElementById('incrementBtn'),
            decrementBtn: document.getElementById('decrementBtn'),
            message: document.getElementById('message')
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateDisplay();
    }
    
    bindEvents() {
        this.elements.incrementBtn.addEventListener('click', () => {
            this.increment();
        });
        
        this.elements.decrementBtn.addEventListener('click', () => {
            this.decrement();
        });
        
        // Добавляем обработчики для клавиатуры
        document.addEventListener('keydown', (e) => {
            if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                this.increment();
            } else if (e.key === '-' || e.key === '_') {
                e.preventDefault();
                this.decrement();
            }
        });
    }
    
    increment() {
        if (this.count < this.maxLimit) {
            this.count++;
            this.updateDisplay();
        }
    }
    
    decrement() {
        if (this.count > this.minLimit) {
            this.count--;
            this.updateDisplay();
        }
    }
    
    updateDisplay() {
        // Обновляем значение
        this.elements.result.textContent = this.count;
        
        // Обновляем цвет фона в зависимости от значения
        this.updateBackgroundColor();
        
        // Обновляем состояние кнопок
        this.updateButtonsState();
        
        // Проверяем экстремальные значения
        this.checkExtremeValues();
    }
    
    updateBackgroundColor() {
        const resultElement = this.elements.result;
        
        // Удаляем предыдущие классы
        resultElement.classList.remove('positive', 'negative', 'zero');
        
        // Добавляем соответствующий класс
        if (this.count > 0) {
            resultElement.classList.add('positive');
        } else if (this.count < 0) {
            resultElement.classList.add('negative');
        } else {
            resultElement.classList.add('zero');
        }
    }
    
    updateButtonsState() {
        // Блокируем кнопку "+" при достижении максимума
        this.elements.incrementBtn.disabled = this.count >= this.maxLimit;
        
        // Блокируем кнопку "-" при достижении минимума
        this.elements.decrementBtn.disabled = this.count <= this.minLimit;
    }
    
    checkExtremeValues() {
        const messageElement = this.elements.message;
        
        if (this.count === this.maxLimit || this.count === this.minLimit) {
            messageElement.textContent = 'Вы достигли экстремального значения!';
            messageElement.classList.add('show');
        } else {
            messageElement.textContent = '';
            messageElement.classList.remove('show');
        }
    }
    
    // Метод для сброса счетчика (дополнительная функциональность)
    reset() {
        this.count = 0;
        this.updateDisplay();
    }
    
    // Метод для установки произвольного значения (дополнительная функциональность)
    setValue(value) {
        if (value >= this.minLimit && value <= this.maxLimit) {
            this.count = value;
            this.updateDisplay();
        }
    }
}

// Инициализация счетчика при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const counter = new Counter();
    
    // Добавляем глобальные методы для тестирования (можно удалить в продакшене)
    window.counter = counter;
    
    console.log('Счетчик инициализирован!');
    console.log('Используйте:');
    console.log('- Кнопки "+" и "-"');
    console.log('- Клавиши "+" и "-" на клавиатуре');
    console.log('- counter.increment() и counter.decrement() в консоли');
    console.log('- counter.setValue(число) для установки значения');
    console.log('- counter.reset() для сброса');
});
