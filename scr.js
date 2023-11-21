// Vue приложение для отображения времени
const dateApp = Vue.createApp({
    data() {
      return {
        currentDate: new Date().toLocaleString()
      };
    },
    mounted() {
      setInterval(() => {
        this.currentDate = new Date().toLocaleString();
      }, 1000);
    }
  });
  dateApp.mount('#date');
  
  // Vue приложение калькулятора
  const calcApp = Vue.createApp({
    data() {
      return {
        operand1: null,
        operand2: null,
        selectedOperation: 'add',
        result: null,
        errorMessage: '',
        numberWords: {
            один: { value: 1, forms: ['один', 'одного', 'одному', 'один', 'одним', 'одном'] },
            два: { value: 2, forms: ['два', 'двух', 'двум', 'две', 'двумя', 'двух'] },
            три: { value: 3, forms: ['три', 'трех', 'трем', 'три', 'тремя', 'трех'] },
            четыре: { value: 4, forms: ['четыре', 'четырех', 'четырем', 'четыре', 'четырьмя', 'четырех'] },
            пять: { value: 5, forms: ['пять', 'пяти', 'пяти', 'пять', 'пятью', 'пяти'] },
            шесть: { value: 6, forms: ['шесть', 'шести', 'шести', 'шесть', 'шестью', 'шести'] },
            семь: { value: 7, forms: ['семь', 'семи', 'семи', 'семь', 'семью', 'семи'] },
            восемь: { value: 8, forms: ['восемь', 'восьми', 'восьми', 'восемь', 'восемью', 'восьми'] },
            девять: { value: 9, forms: ['девять', 'девяти', 'девяти', 'девять', 'девятью', 'девяти'] },
            десять: { value: 10, forms: ['десять', 'десяти', 'десяти', 'десять', 'десятью', 'десяти'] },
            одиннадцать: { value: 11, forms: ['одиннадцать', 'одиннадцати', 'одиннадцати', 'одиннадцать', 'одиннадцатью', 'одиннадцати'] },
            двенадцать: { value: 12, forms: ['двенадцать', 'двенадцати', 'двенадцати', 'двенадцать', 'двенадцатью', 'двенадцати'] },
            тринадцать: { value: 13, forms: ['тринадцать', 'тринадцати', 'тринадцати', 'тринадцать', 'тринадцатью', 'тринадцати'] },
            четырнадцать: { value: 14, forms: ['четырнадцать', 'четырнадцати', 'четырнадцати', 'четырнадцать', 'четырнадцатью', 'четырнадцати'] },
            пятнадцать: { value: 15, forms: ['пятнадцать', 'пятнадцати', 'пятнадцати', 'пятнадцать', 'пятнадцатью', 'пятнадцати'] },
            шестнадцать: { value: 16, forms: ['шестнадцать', 'шестнадцати', 'шестнадцати', 'шестнадцать', 'шестнадцатью', 'шестнадцати'] },
            семнадцать: { value: 17, forms: ['семнадцать', 'семнадцати', 'семнадцати', 'семнадцать', 'семнадцатью', 'семнадцати'] },
            восемнадцать: { value: 18, forms: ['восемнадцать', 'восемнадцати', 'восемнадцати', 'восемнадцать', 'восемнадцатью', 'восемнадцати'] },
            девятнадцать: { value: 19, forms: ['девятнадцать', 'девятнадцати', 'девятнадцати', 'девятнадцать', 'девятнадцатью', 'девятнадцати'] },
            двадцать: { value: 20, forms: ['двадцать', 'двадцати', 'двадцати', 'двадцать', 'двадцатью', 'двадцати'] },
            сто: { value: 100, forms: ['сто', 'ста', 'ста', 'сто', 'ста', 'ста'] },
            двести: { value: 200, forms: ['двести', 'двухсот', 'двумстам', 'двести', 'двумястами', 'двухстах'] },
            триста: { value: 300, forms: ['триста', 'трехсот', 'тремстам', 'триста', 'тремястами', 'трехстах'] },
            четыреста: { value: 400, forms: ['четыреста', 'четырехсот', 'четыремстам', 'четыреста', 'четырьмястами', 'четырехстах'] },
            пятьсот: { value: 500, forms: ['пятьсот', 'пятисот', 'пятистам', 'пятьсот', 'пятьюстами', 'пятистах'] },
            шестьсот: { value: 600, forms: ['шестьсот', 'шестисот', 'шестистам', 'шестьсот', 'шестьюстами', 'шестистах'] },
            семьсот: { value: 700, forms: ['семьсот', 'семисот', 'семистам', 'семьсот', 'семьюстами', 'семистах'] },
            восемьсот: { value: 800, forms: ['восемьсот', 'восьмисот', 'восьмистам', 'восемьсот', 'восемьюстами', 'восьмистах'] },
            девятьсот: { value: 900, forms: ['девятьсот', 'девятисот', 'девятистам', 'девятьсот', 'девятьюстами', 'девятистах'] },
            тысяча: { value: 1000, forms: ['тысяча', 'тысячи', 'тысяче', 'тысячу', 'тысячей', 'тысяч'] },
            миллион: { value: 1000000, forms: ['миллион', 'миллиона', 'миллиону', 'миллион', 'миллионом', 'миллионе'] },
            миллиард: { value: 1000000000, forms: ['миллиард', 'миллиарда', 'миллиарду', 'миллиард', 'миллиардом', 'миллиарде'] }
        },
        history: []
      };
    },
    methods: {
      calculate() {
        const num1 = this.convertTextToNumber(this.operand1);
        const num2 = this.convertTextToNumber(this.operand2);
  
        if (!isNaN(num1) && !isNaN(num2)) {
          const operations = {
            add: '+', subtract: '-', multiply: '*', divide: '/'
          };
          const operationSymbol = operations[this.selectedOperation] || '';
  
          const operationName = {
            add: 'Сложение', subtract: 'Вычитание', multiply: 'Умножение', divide: 'Деление'
          }[this.selectedOperation] || '';
  
          this.result = eval(`${num1} ${operationSymbol} ${num2}`);
  
          const currentDate = new Date().toLocaleString();
          const calculation = {
            expression: `${num1} ${operationSymbol} ${num2} = ${this.result}`,
            operation: operationName,
            date: currentDate
          };
  
          this.history.unshift(calculation);
        } else {
          this.result = 'Введите корректные числа';
        }
      },
      convertTextToNumber(value) {
        let result = parseFloat(value);
      
        if (isNaN(result)) {
          const words = value.toLowerCase().split(' ');
      
          let tempResult = 0;
          let tempMultiplier = 1;
      
          words.forEach(word => {
            const foundNumber = Object.values(this.numberWords).find(item => item.forms.includes(word));
      
            if (foundNumber) {
              if (foundNumber.value >= 1000) {
                tempMultiplier *= foundNumber.value;
                result = (result || 0) + tempResult * tempMultiplier;
                tempResult = 0;
              } else {
                tempResult += foundNumber.value;
              }
            } else {
              result = NaN; // Устанавливаем NaN, если слово не найдено в numberWords
            }
          });
      
          if (!isNaN(tempResult)) {
            result = (result || 0) + tempResult;
          } else {
            result = NaN;
          }
        }
      
        return result;
      },     

      validateInput(field) {
        this.errorMessage = '';
        const value = this[field];
  
        const regex = /^[а-яё\d]+$/i;
        if (!regex.test(value)) {
          this.errorMessage = 'Используйте только кириллицу и цифры';
        }
      }
    }
  });
  
  calcApp.mount('#calc');  