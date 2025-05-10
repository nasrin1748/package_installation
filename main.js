// Function to load Pyodide and install Python packages
async function loadPyodideAndInstallPackages() {
    const statusElement = document.getElementById("status");
    const outputElement = document.getElementById("output");

    try {
        // Load Pyodide
        const pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });
        statusElement.textContent = "Pyodide loaded successfully!";

        // Load micropip
        await pyodide.loadPackage("micropip");
        statusElement.textContent = "Micropip loaded successfully!";

        // List of Python packages to install
        const packages = ["numpy", "pandas", "matplotlib","buckaroo"];

        // Install each package using micropip
        statusElement.textContent = "Installing packages...";
        for (const pkg of packages) {
            try {
                await pyodide.runPythonAsync(`
                    import micropip
                    await micropip.install('${pkg}')
                `);
                outputElement.innerHTML += `<p>${pkg} installed successfully!</p>`;
            } catch (err) {
                outputElement.innerHTML += `<p>Failed to install ${pkg}: ${err.message}</p>`;
            }
        }

        // Test one of the installed packages (e.g., numpy)
        const numpyResult = await pyodide.runPythonAsync(`
            import numpy as np
            import os
            np.array([1, 2, 3]) * 2
            os.getcwd()
        `);
        outputElement.innerHTML += `<p>Numpy Test Result: ${numpyResult}</p>`;
    } catch (err) {
        statusElement.textContent = `Error: ${err.message}`;
    }
}

// Call the function
loadPyodideAndInstallPackages();