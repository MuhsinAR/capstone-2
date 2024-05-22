import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests


const Home = () => {
   
    useEffect(() => {
        
    }, []);

    
    


    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mt-8 mb-4">Welcome To The Better Tomorrow Resource Center</h1>
            <p className="mb-4">At Better Tomorrow it is our mission to connect you with the services you need to improve your physical and mental health.
        </p>
            <p>Taking care of both your physical and mental wellbeing is crucial for leading a healthy and fulfilling life. Physical health encompasses everything from maintaining a balanced diet and staying active to getting enough sleep and avoiding harmful substances. By prioritizing physical health, individuals can reduce their risk of chronic illnesses, enhance their immune system, and improve their overall quality of life. Similarly, mental health is equally important and involves managing stress, seeking support when needed, and engaging in activities that promote relaxation and emotional well-being. Taking care of your mental health can lead to increased resilience, better relationships, and improved productivity in various aspects of life. Together, a focus on both physical and mental wellbeing creates a foundation for overall wellness and enables individuals to thrive in all aspects of their lives.

In the Better Tomorrow Resource Center, we are committed to providing resources and support to help individuals enhance their physical and mental health. Through our curated links to treatment services and emergency numbers, we aim to connect individuals with the assistance they need to address their health concerns and access the support necessary for their well-being. By empowering individuals with information and access to services, we strive to promote a healthier tomorrow for everyone.






</p>
            
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Links To Treatment Services:</h2>
                <ul>
                    <li><a href="https://www.aa.org/" className="text-blue-500 hover:underline">Alcoholics Anonymous</a></li>
                    <li><a href="https://www.aa.org/find-aa" className="text-blue-500 hover:underline">Find An AA Meeting</a></li>
                    <li><a href="https://www.na.org/" className="text-blue-500 hover:underline">Narcotics Anonymous</a></li>
                    <li><a href="https://www.na.org/?ID=meeting-search-1" className="text-blue-500 hover:underline">Find An NA Meeting</a></li>
                    </ul>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">Emergency Numbers:</h2>
                <ul>
                    <li>National Suicide Prevention Lifeline: <a href="tel:1-800-273-8255">1-800-273-8255</a></li>
                    <li>Healthcare.gov Customer Service: <a href="tel:1-800-318-2596">1-800-318-2596</a></li>
                    <li>Alcoholics Anonymous Helpline: <a href="tel:1-212-870-3400">1-212-870-3400</a></li>
                    <li>Narcotics Anonymous Helpline: <a href="tel:1-844-625-4657">1-844-625-4657</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
