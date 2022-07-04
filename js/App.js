class App {
    constructor({
        billInput,
        tipButtons,
        tipInput,
        numberOfPeopleInput,
        resetButton,
        warningSign,
        tipSpan,
        totalSpan
    }) {
    this.billInput = billInput;
    this.tipButtons = tipButtons;
    this.tipInput = tipInput;
    this.numberOfPeopleInput = numberOfPeopleInput;
    this.resetButton = resetButton;
    this.warningSign = warningSign;
    this.tipSpan = tipSpan,
    this.totalSpan = totalSpan
    }

    billValue = 0;
    tipValue = 0;
    peopleNumber = 0;

    init() {
        this.getBillValue(this.billInput);
        this.getTipValue(this.tipButtons, this.tipInput);
        this.getPeopleNumber(this.numberOfPeopleInput);
        this.tipInputStyle();
        this.reset();
    }

    getBillValue(input) {
        input.addEventListener('input', (e) => {
            this.billValue = parseInt(e.target.value);
            console.log(this.billValue);
            this.displayResults();
        })
    }
    
    getTipValue(buttons, input) {
        buttons.forEach(button => button.addEventListener('click', (e) => {
            const buttonValue = parseInt(e.target.textContent.slice(0, -1)) * 0.01;
            this.tipValue = buttonValue;
            this.removeTipStyle();
            button.classList.add('tip-selector__option--active');
            this.displayResults();
        }))

        input.addEventListener('input', (e) => {
            if (e.target.value >= 0) {
                this.tipValue = e.target.value * 0.01;
                this.displayResults();
            }
        })
    }

    getPeopleNumber(input) {
        input.addEventListener('input', (e) => {
            if (e.target.value <= 0) {
                this.warningSign.classList.add('people-number__warning--error');
                this.numberOfPeopleInput.classList.add('people-number__input--error');
            } else {
                this.peopleNumber = parseInt(e.target.value);
                this.warningSign.classList.remove('people-number__warning--error');
                this.numberOfPeopleInput.classList.remove('people-number__input--error');
                this.displayResults();
            }
        })
    }

    tipInputStyle() {
        this.tipInput.addEventListener('click', () => {
            this.removeTipStyle();
            this.tipInput.classList.add('tip-selector__input--active');
        });
    }

    removeTipStyle() {
        this.tipButtons.forEach(button => button.classList.remove('tip-selector__option--active'));
        this.tipInput.classList.remove('tip-selector__input--active');
    }


    calcTipAmount(billValue, tipValue, peopleNumber) {
        if (this.peopleNumber > 0) {
            const tipAmount = billValue * tipValue / peopleNumber;
            return tipAmount.toFixed(2);
        }
    }

    calcTotalAmount(billValue, tipValue, peopleNumber) {
        if (this.peopleNumber > 0) {
            const totalAmount = (billValue + billValue * tipValue) / peopleNumber;
            return totalAmount.toFixed(2);
        }
    }

    displayResults() {
        if (this.peopleNumber > 0) {
            this.tipSpan.textContent = this.calcTipAmount(this.billValue, this.tipValue, this.peopleNumber);
            this.totalSpan.textContent = this.calcTotalAmount(this.billValue, this.tipValue, this.peopleNumber);
        } else {
            this.tipSpan.textContent = '0.00';
            this.totalSpan.textContent = '0.00';
        }
    }

    reset() {
        this.resetButton.addEventListener('click', () => {
            this.billInput.value = '';
            this.tipInput.value = '';
            this.numberOfPeopleInput.value = '';
            this.billValue = 0;
            this.tipValue = 0;
            this.peopleNumber = 0;
            this.displayResults();
            this.removeTipStyle();
        })
    }
}
const app = new App({
    billInput: document.querySelector('[data-bill-input]'),
    tipButtons: document.querySelectorAll('[data-tip-button]'),
    tipInput: document.querySelector('[data-tip-input]'),
    numberOfPeopleInput: document.querySelector('[data-people-input]'),
    resetButton: document.querySelector('[data-reset-button]'),
    warningSign: document.querySelector('[data-warning]'),
    tipSpan: document.querySelector('[data-result-tip]'),
    totalSpan: document.querySelector('[data-result-total]')
});

app.init();

