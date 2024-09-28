# SGPA to CGPA & Percentage Calculator

This is a simple web app that helps users calculate their CGPA (Cumulative Grade Point Average) and percentage based on their semester-wise SGPA (Semester Grade Point Average). The app supports two methods of calculation and allows conversion between CGPA and percentage using different grading scales. (This was built to try out V0.dev and cursor.ai)

## Features

- **Two calculation methods:**
  - **Method 1:** Enter individual SGPAs for each semester.
  - **Method 2:** Enter the total SGPA and the number of semesters.
- **Grading scale options:**
  - 4.0 scale
  - 10.0 scale (most common in India)
  - Custom scale support (coming soon)
- **CGPA to percentage conversion:**
  - Automatically converts CGPA to percentage based on the selected grading scale.
  
## Demo

Check out the live demo here: [SGPA to CGPA & Percentage Calculator](https://sgpa2cgpa.vercel.app/)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/mr-chandan/sgpa2cgpa.git
   ```

2. Navigate to the project directory:

   ```bash
   cd sgpa2cgpa
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   ```
   http://localhost:3000
   ```

## Usage

1. **Method 1:** Enter your SGPA for each semester and click the "Calculate CGPA" button.
2. **Method 2:** Enter the total sum of your SGPA and the number of semesters.
3. Select your grading scale (4.0, 10.0) to see both your CGPA and percentage.
4. Use the "Reset" button to clear all inputs and start again.

## Technologies Used

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (for animations)
- **Radix UI** (for UI components)

## Contribution

Contributions are welcome! Feel free to fork this repository, open issues, and submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Feedback

I'd love to hear your feedback! Feel free to open an issue or reach out via GitHub if you have any suggestions or find any bugs.