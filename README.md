# 🚀 Dynamic Form Builder

A powerful, feature-rich form builder application built with React 19, TypeScript, Redux Toolkit, and Material-UI. Create dynamic forms with drag-and-drop functionality, custom validations, derived fields, and real-time preview.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-v7-0081CB?logo=mui)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 🛠️ Form Builder
- **7 Field Types**: Text, Number, Textarea, Select, Radio, Checkbox, Date
- **Drag & Drop**: Reorder fields with intuitive drag-and-drop interface
- **Field Configuration**: Customize labels, default values, and validation rules
- **Derived Fields**: Auto-calculated fields based on parent field values (Age from DOB, Sum calculations)

### 🔧 Validation System
- **Built-in Validators**: Required, Min/Max Length, Email format
- **Custom Rules**: Password validation (8+ chars, must contain number)
- **Real-time Validation**: Instant feedback during form interaction

### 📱 User Experience
- **Live Preview**: See exactly how your form will look to end users
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Persistent Storage**: All forms saved to localStorage (no backend required)
- **Clean Interface**: Intuitive Material-UI components

### 🎯 Core Functionality
- **Create Forms**: Build forms with multiple field types and configurations
- **Preview Mode**: Interactive preview with real-time validation
- **Form Management**: View, edit, and organize all saved forms

## 🚀 Live Demo

**[View Live Application](https://form-builder-one-silk.vercel.app/create)**

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI v7 (MUI)
- **Routing**: React Router v7
- **Drag & Drop**: @hello-pangea/dnd
- **Build Tool**: Create React App
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- npm or yarn

### Clone and Install


Clone the repository
git clone https://github.com/Anish-kumar7641/Form-Builder.git

Navigate to project directory
cd Form-Builder

Install dependencies
npm install

Start development server
npm start



## 📖 Usage Guide

### Creating a Form
1. Navigate to the **Create Form** page
2. Click **"Add Field"** to add form elements
3. Configure each field:
   - Set label and default value
   - Choose validation rules
   - Mark as derived field if needed
4. Drag and drop to reorder fields
5. Click **"Save Form"** and provide a name

### Derived Fields
Create fields that automatically calculate values:
- **Age from Date of Birth**: Automatically calculates age
- **Sum Calculation**: Adds values from multiple fields
- **Custom Formula**: Define your own calculation logic

### Form Preview
- Test your form as an end user would see it
- Real-time validation feedback
- Derived fields update automatically

### Managing Forms
- View all saved forms in **My Forms**
- See form metadata (creation date, field count)
- Quick preview or edit existing forms

## 🔧 Available Scripts



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Assignment Requirements

This project fulfills all requirements of the React + Redux Form Builder assignment:

- ✅ **Dynamic Form Creation**: 7 field types with full configuration
- ✅ **Validation System**: Built-in and custom validation rules
- ✅ **Derived Fields**: Auto-calculation based on parent fields
- ✅ **Drag & Drop**: Field reordering functionality
- ✅ **Real-time Preview**: Interactive form preview
- ✅ **Persistent Storage**: localStorage integration
- ✅ **Clean Architecture**: Modular, type-safe codebase
- ✅ **Modern Stack**: React 19, TypeScript, Redux Toolkit, MUI v7

## 🐛 Known Issues

- Drag & drop requires `@hello-pangea/dnd` due to React 19 compatibility
- Complex formulas in derived fields use basic evaluation (could be enhanced with expression parser)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Anish Kumar**
- GitHub: [@Anish-kumar7641](https://github.com/Anish-kumar7641)

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- Redux Toolkit for simplified state management
- React team for the amazing framework
- Hello Pangea team for maintaining the drag-and-drop library

---

⭐ **Star this repository if you found it helpful!**
