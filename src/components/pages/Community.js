// Libraries
import React from "react";

// Data
import communityData from "data/community.json";

class Community extends React.Component{
    render(){
        return (
            <div className="container column center community">
                <div className="communityHeader">
                    <h1>WELCOME TO THE COMMUNITY!</h1>
                    <input type="search" placeholder="Search"/>
                    <p className="green">ASK A NEW QUESTION</p>
                </div>
                <ol className="container column">
                    {
                        communityData.map(
                            ( question, i ) => {
                                return(
                                    <li key={i}>
                                        <p className="text">{question.text}</p>
                                        <p className="answer">{question.answers} ANSWERS</p>
                                        <span>&#8250;</span>
                                    </li>
                                );
                            }
                        )
                    }
                </ol>
            </div>
        );
    }
};

export default Community;
