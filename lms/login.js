document.getElementById('btnLogin').addEventListener('click', (e) => {
    const loginAlert = document.getElementById('loginAlert'); // Error alert element
    const userName = document.forms.login.loginUserName.value.trim();
    const password = document.forms.login.loginPassword.value.trim();
    const type = document.forms.login.loginRadioOptions.value.trim(); // Ensure this is correctly fetched as a string or number
    const users = JSON.parse(localStorage.getItem('users')) || []; // Fetch users from localStorage

    console.log("Login Attempt:");
    console.log("Username:", userName);
    console.log("Password:", password);
    console.log("Type:", type);
    console.log("Stored Users:", users);

    // Form validation
    if (!document.forms.login.checkValidity()) {
        e.preventDefault(); // Stop form submission
        e.stopPropagation();
        document.forms.login.classList.add('was-validated');
        return; // Exit if form is invalid
    }

    if (users.length > 0) {
        // Find the matching user
        const loginUser = users.find(
            (ele) =>
                ele.userName === userName &&
                ele.password === password &&
                ele.type === type
        );

        if (loginUser) {
            // Save user details in sessionStorage
            sessionStorage.setItem('loginUser', JSON.stringify(loginUser));

            // Navigate based on type
            if (loginUser.type === "0") {
                console.log("Redirecting to admin dashboard...");
                location.href = './admin/index.html'; // Update path if needed
                return; // Stop further execution
            } else if (loginUser.type === "1") {
                console.log("Redirecting to student dashboard...");
                location.href = './student/index.html'; // Update path if needed
                return; // Stop further execution
            }
        } else {
            console.warn("Invalid login credentials!");
            loginAlert.classList.remove('d-none');
        }
    } else {
        console.warn("No users found in local storage!");
        loginAlert.classList.remove('d-none');
    }

    // Hide alert after 2 seconds
    setTimeout(() => {
        loginAlert.classList.add('d-none');
    }, 2000);
});
