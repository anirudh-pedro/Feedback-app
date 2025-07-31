import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Feedback from './pages/Feedback'
import FeedbackForm from './components/FeedbackForm'
import Profile from './pages/Profile'
import FormEditor from './pages/FormEditor'
import Analytics from './pages/Analytics'
import Templates from './pages/Templates'
import TemplatePreview from './pages/TemplatePreview'
import FormSettings from './pages/FormSettings'
import NotFound from './pages/NotFound'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
// import { useContext } from 'react'


function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/form/:formId' element={<FeedbackForm />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit-form/:formId' element={<FormEditor />} />
        <Route path='/analytics/:formId' element={<Analytics />} />
        <Route path='/templates' element={<Templates />} />
        <Route path='/preview-template/:templateId' element={<TemplatePreview />} />
        <Route path='/form-settings/:formId' element={<FormSettings />} />
        <Route path='/template-preview/:formId' element={<TemplatePreview />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
