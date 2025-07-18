import DisplayManager from "./DisplayManager";

import { useState, useEffect } from 'react'

const urlPrefix = 'https://cataas.com/cat/';

export default function GameManager() {
    // Set state
    const [gameState, setGameState] = useState(({
        cats: null,
        score: 0,
        highScore: 0
    }));

    // Grab the cat picture urls
    useEffect(() => {
      const fetchCats = async () => {
        try {
          const response = await fetch('https://cataas.com/api/cats?limit=12&skip=0');
          const data = await response.json();
          // Now map to the cat state
        const catData = data.map((entry) => {
                return {
                    url: urlPrefix + entry.id,
                    score: 0
                }
          });
        setGameState(
            {
                cats: catData,
                score: 0,
                highScore: 0
            }
        )          
        } catch (err) {
          console.error('Issue getting cat:', err);
        }
      }
      fetchCats();

    // For debugging
    setGameState({
        cats: [{score: 0, url: 'test'}, {score: 0, url: 'test1'}],
        score: 0,
        highScore: 0
    });

    }, []);

    // Define callback function
    function clickCat(index) {
        // Check if that cat has a score
        if (gameState.cats[index].score === 0) {
            // Increment scores and reshuffle
            const newCats = [...gameState.cats];
            newCats[index].score = 1;
            const newScore = gameState.score + 1;
            let newHighScore;
            if (newScore > gameState.highScore) {
                newHighScore = newScore;
            } else {
                newHighScore = gameState.highScore;
            }
            // Re-set state.
            setGameState(({
                cats: newCats,
                score: newScore,
                highScore: newHighScore
            }))
        } else {
            // Reset and maybe throw an alert? !!
            const newCats = [...gameState.cats];
            for (let i = 0; i < newCats.length; i++) {
                newCats[i].score = 0;
            }
            // Set state
            setGameState(({
                cats: newCats,
                score: 0,
                highScore: gameState.highScore
            }))
            alert("You already clicked on that cat! Resetting.");
        }
        // Maybe should have a win condition?!!
    }

    // Use display manager to draw
    return (
        <DisplayManager 
            imageDetails={gameState.cats}
            clickCallback={clickCat}
            score={gameState.score}
            highScore={gameState.highScore}
        />
    )

}