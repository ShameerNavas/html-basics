function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = "";

    if (name === "" || email === "") {
        errorMessage.textContent = "All fields are required.";
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        errorMessage.textContent = "Please enter a valid email address.";
        return false;
    }

    alert("Form submitted successfully!");
    return true;
}
