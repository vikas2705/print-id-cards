# Student ID Card Generator

A React application that reads student data from a CSV file and generates professional ID cards with print functionality.

## Features

- 📊 **CSV Data Import**: Automatically reads student data from CSV files
- 🆔 **Professional ID Cards**: Generates ID cards in standard dimensions (8.6cm × 5.4cm)
- 🖨️ **Print Functionality**: Uses react-to-print for high-quality print preview
- 🎨 **Modern UI**: Beautiful, responsive design with glassmorphism effects
- 👤 **Dummy Photos**: Generates unique avatar images for each student using DiceBear API
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## Student Data Structure

The application expects a CSV file with the following columns:
- **Name**: Student's full name
- **Email**: Student's email address
- **Mobile**: Contact number
- **User ID**: Unique student identifier
- **Form Number**: Application form number
- **Enrollment Number**: Student enrollment number
- **Programme**: Course/program name
- **Status**: Admission status

## ID Card Features

Each generated ID card includes:
- Institution header with program name
- Student photo (generated avatar)
- Student information (Name, User ID, Form Number, Programme, Status)
- Signature section
- Validity date
- Professional design with proper spacing

## Installation & Setup

1. **Clone or download the project**
   ```bash
   cd id-card-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your CSV file**
   - Place your CSV file in the `public` folder
   - Update the file path in `src/App.js` if needed

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The application will automatically load and display student ID cards

## Usage

1. **View ID Cards**: All student ID cards are displayed in a responsive grid layout
2. **Print Individual Cards**: Click the "Print ID Card" button on any card to open the print preview
3. **Print Settings**: The application automatically sets the correct page size (8.6cm × 5.4cm) for printing

## Print Functionality

- Uses `react-to-print` library for reliable printing
- Automatically sets page dimensions to 8.6cm × 5.4cm
- Optimized print styles for clean output
- Print preview shows exactly how the card will appear when printed

## Customization

### Styling
- Modify `src/components/IdCard.css` to change card appearance
- Update `src/App.css` for overall application styling
- Adjust `src/components/IdCardList.css` for grid layout

### Data Source
- Update the CSV file path in `src/App.js`
- Modify the data parsing logic if your CSV structure differs

### Card Design
- Edit the JSX structure in `src/components/IdCard.js`
- Add or remove fields as needed
- Customize the dummy image generation logic

## Dependencies

- **React**: Frontend framework
- **react-to-print**: Print functionality
- **papaparse**: CSV parsing library

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Print Compatibility

- Chrome/Chromium browsers (best print support)
- Firefox
- Safari
- Edge

## File Structure

```
id-card-generator/
├── public/
│   ├── Sample-data.csv - Sheet1.csv    # Student data
│   ├── reference1.jpeg                 # Reference image 1
│   └── reference2.jpeg                 # Reference image 2
├── src/
│   ├── components/
│   │   ├── IdCard.js                   # Individual ID card component
│   │   ├── IdCard.css                  # ID card styles
│   │   ├── IdCardList.js               # Card list component
│   │   └── IdCardList.css              # List styles
│   ├── App.js                          # Main application component
│   ├── App.css                         # Application styles
│   └── index.css                       # Global styles
└── README.md                           # This file
```

## Troubleshooting

### CSV Loading Issues
- Ensure the CSV file is in the `public` folder
- Check that the file path in `App.js` is correct
- Verify CSV format matches the expected structure

### Print Issues
- Use Chrome browser for best print compatibility
- Check print settings in browser
- Ensure page size is set correctly in print dialog

### Styling Issues
- Clear browser cache if styles don't update
- Check CSS file paths and imports
- Verify responsive breakpoints

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

## License

This project is open source and available under the MIT License. 