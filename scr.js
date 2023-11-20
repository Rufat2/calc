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
          один: 1, два: 2, три: 3, четыре: 4, пять: 5, шесть: 6, семь: 7, восемь: 8, девять: 9, десять: 10,
          одиннадцать: 11, двенадцать: 12, тринадцать: 13, четырнадцать: 14, пятнадцать: 15, шестнадцать: 16,
          семнадцать: 17, восемнадцать: 18, девятнадцать: 19, двадцать: 20, тридцать: 30, сорок: 40,
          пятьдесят: 50, шестьдесят: 60, семьдесят: 70, восемьдесят: 80, девяносто: 90,
          сто: 100, двести: 200, триста: 300, четыреста: 400, пятьсот: 500, шестьсот: 600,
          семьсот: 700, восемьсот: 800, девятьсот: 900, тысяча: 1000, миллион: 1000000,
          миллиард: 1000000000
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
          result = words.reduce((acc, word) => {
            return this.numberWords[word] ? acc + this.numberWords[word] : NaN;
          }, 0);
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