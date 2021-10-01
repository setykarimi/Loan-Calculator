//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    e.preventDefault();

    //Hide results
    document.getElementById('results').style.display = "none";
    //show Loader
    document.getElementById('loading').style.display = "block";

    setTimeout(calucalteResults, 2000);

});

function calucalteResults(e) {
    console.log('calculating');
    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calucatedPayments = parseFloat(years.value) * 12;


    //Compute monthly Payments
    const x = Math.pow(1 + calculatedInterest, calucatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);


    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calucatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calucatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = "block";

        //Hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your Numbers');
    }

}


function showError(error) {
    document.getElementById('results').style.display = "none";

    //Hide loader
    document.getElementById('loading').style.display = 'none';
    //Create a div
    const errorDiv = document.createElement('div');

    //get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //add class
    errorDiv.className = 'alert alert-danger';

    //create text node append to div
    errorDiv.append(document.createTextNode(error));
    // or errorDiv.innerHtml = error :))

    //Insert Error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 second
    setTimeout(cleareError, 3000);
}

function cleareError() {
    document.querySelector('.alert').remove()
}