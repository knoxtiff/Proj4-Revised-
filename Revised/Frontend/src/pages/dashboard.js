import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
//import './dashboard.css'; 

const Dashboard = () => {
    const navigate = useNavigate(); 
    const [category, setCategory] = useState([]); 
    const [questions, setQuestions] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState(''); 
    const [error, setError] = useState(''); 


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch ('http://localhost:3001/allcategories') 
                if (response.ok) {
                    
                    const data = await response.json(); 
                    console.log(data)
                    setCategory(data || []); 
                } else {
                    console.error('Failed to fetch categories'); 
                    setError(null);
                } 
            } catch (error) {
                console.error('Error:', error); 
            }
        }; 
        fetchCategory(); 
    }, []); 

    const fetchQuestions = async (categoryId, categoryName) => {
        console.log(categoryId, categoryName);
        setError(null); // Reset any previous errors
        try {
            const response = await fetch(`http://localhost:3001/${categoryId}/questions`);
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setQuestions(data || []);
                setSelectedCategory(categoryName);
            } else {
                setError(data.message || "Error fetching questions");
            }
        } catch (err) {
            setError("Failed to fetch questions. Please try again.");
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="dashboard">
            <h2>I'll be there for you....</h2>
            <p>Pick a topic.</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>

            <div className="categories">
                {category.length > 0 ? (
                    category.map((category) => (
                        <button
                            key={category.categoryID}
                            onClick={() => fetchQuestions(category.categoryID, category.categoryName)}
                            className="category-button"
                        >
                            {category.categoryName}
                        </button>
                    ))
                ) : (
                    <p>No categories available</p>
                )}
            </div>

            <div className="questions-section">
    {selectedCategory && <h3>Questions for {selectedCategory}</h3>}
    
    { questions.length > 0 ? (
        questions.map((questions) => (
            <QuestionItem
                key={questions.idquestions}
                question={questions}
            />
        ))
    ) : (
        <p>No questions added for this category.</p> // Display message if no questions
    )}
</div>
        </div>
    );
};

const QuestionItem = ({ questions }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="question-item">
            <div className="question-header" onClick={toggleDropdown}>
                <p><strong>Q:</strong> {questions.questionText}</p>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="question-answer">
                    <p><strong>A:</strong> {questions.answer}</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;