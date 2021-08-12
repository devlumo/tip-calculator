const bill = document.querySelector('.bill');
const customTip = document.querySelector('.custom-tip');
const people = document.querySelector('.people');
const tipBtns = document.querySelectorAll('.btn');
const reset = document.querySelector('.reset-btn');

const validateElements = [bill, people];

validateElements.forEach((item) => {

    item.addEventListener('focus', () => {
        item.classList.add('clicked');
        if(parseInt(item.value) === 0){
            item.classList.add('error')
        }
    })
    
    item.addEventListener('focusout', () => {
        item.classList.remove('clicked');
    
    })
    item.addEventListener('input', () => {
        const val = parseInt(item.value)
        if(val === 0){
            document.querySelector(`.error-${item.classList[0]}`).style.display = "block";
            item.classList.add('error');
            item.classList.remove('clicked');

        }
        else{
            document.querySelector(`.error-${item.classList[0]}`).style.display = "none";
            item.classList.remove('error');
            item.classList.add('clicked');

            if(document.querySelector('.selected-tip')){
                calculateTotals(document.querySelector('.selected-tip').value);
            } 
            else if(customTip.value){
                calculateTotals(customTip.value);
            }
            else{
                calculateTotals();
            }
        }
    })
})


const calculateTotals = (tip) => {
    const billAmount = parseFloat(bill.value);
    const numberOfPpl = parseFloat(people.value);
    let tipAmount = (billAmount/100)*parseFloat(tip);

    if(!billAmount || !numberOfPpl){
        document.querySelector('.total-amount').textContent = `$0.00`;
        document.querySelector('.tip-amount').textContent = `$0.00`;

    } else {
        !tipAmount ? tipAmount = 0 : tipAmount;
        const totalTip = tipAmount / numberOfPpl;
        const totalPayable = (billAmount + tipAmount) / numberOfPpl;
        console.log(billAmount)
        console.log(totalPayable)
        console.log(tipAmount)
        document.querySelector('.tip-amount').textContent = `$${totalTip.toFixed(2)}`;
        document.querySelector('.total-amount').textContent = `$${totalPayable.toFixed(2)}`;
    }
}

tipBtns.forEach((btn) => {
    
    btn.addEventListener('click', () => {
        for(let i = 0; i < tipBtns.length; i++){
            tipBtns[i].classList.remove('selected-tip');
        }
        customTip.value = null;
        btn.classList.add('selected-tip');
        calculateTotals(btn.value)
    })
})

reset.addEventListener('click', () => {
    document.querySelector('.total-amount').textContent = `$0.00`;
    document.querySelector('.tip-amount').textContent = `$0.00`;

    for(let i = 0; i < tipBtns.length; i++){
        tipBtns[i].classList.remove('selected-tip');
    }

    bill.value = null;
    customTip.value = null;
    people.value = null;

})

customTip.addEventListener('input', () => {
    for(let i = 0; i < tipBtns.length; i++){
        tipBtns[i].classList.remove('selected-tip');
    }
    calculateTotals(customTip.value);
});