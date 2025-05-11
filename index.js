const colorContainer = document.getElementById("color-container")
const colorScheme = document.getElementById("color-scheme")
const colorBtn = document.getElementById("color-btn")

renderColors("ff0000", "analogic")

colorBtn.addEventListener("click", () => {
    const selectedColor = document.getElementById("color-picker").value.replace("#", "")
    const selectedMode = document.getElementById("color-mode").value.toLowerCase()

    console.log("Selected Color:", selectedColor)
    console.log("Selected Mode:", selectedMode)

    renderColors(selectedColor, selectedMode)
})

document.body.addEventListener("click", (event) => {
    console.log("Clicked Element:", event)
    if (event.target.dataset.color) {
        const selectedColor = event.target.dataset.color
        navigator.clipboard.writeText(selectedColor)
            .then(() => {
                showAlert(`Color ${selectedColor} copied to clipboard!`)
            })
            .catch((error) => {
                console.error("Error copying color to clipboard:", error)
            })
    }
})

function renderColors(selectedColor, selectedMode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}&count=5`)
        .then((response) => response.json())
        .then((data) => {

            console.log("Color Data:", data)

            const colors = data.colors
            colorContainer.innerHTML = "" // Clear previous colors
            colorScheme.innerHTML = "" // Clear previous colors

            colors.forEach((color) => {
                const colorDiv = document.createElement("div");
                colorDiv.className = "color";
                colorDiv.setAttribute("data-color", color.hex.value);
                colorDiv.style.backgroundColor = color.hex.value;
                colorContainer.appendChild(colorDiv);

                colorScheme.innerHTML += `<div class="scheme"><p>${color.hex.value}</p></div>`;
            });
        })
        .catch((error) => {
            console.error("Error fetching color scheme:", error)
        });
}

function showAlert(message, duration=3000) {
    const alertBox = document.getElementById("alert")
    const messageBox = document.getElementById("alert-message")

    messageBox.textContent = message
    alertBox.style.display = "block"

    setTimeout(() => {
        alertBox.style.display = "none";
    }, duration);
}
