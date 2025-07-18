import ImageCard from "./ImageCard";
import ScoreDisplay from "./ScoreDisplay";

import { useState } from "react";

export default function DisplayManager(
    imageDetails,
    clickCallback,
    score,
    highScore
) {
    // imageDetails is an array of structs w/ url and a score
    const [imgOrder, setImgOrder] = useState([]);
   
    // Initialize or shuffle
    if (imgOrder.length != imageDetails.length) {
        const intialOrder = [];
        for (let i = 0; i < imageDetails.length; i++) {
            intialOrder.push(i);
        }
        setImgOrder(intialOrder);
    } else {
        const currentOrder = [...imgOrder];
        // Take from current order to new order at random
        const newOrder = [];
        while (currentOrder.length > 0) {
            let takeIndex = Math.floor(Math.random() * (currentOrder.length));
            newOrder.push(currentOrder[takeIndex]);
            currentOrder.splice(takeIndex, 1);
        }
        setImgOrder(newOrder);
    }
    
    // Now, draw based on that ordering
    if (imageDetails === null) {
        return (
            <>
                <ScoreDisplay 
                        currentScore={0}
                        highScore={0}
                />
                <p>Currently fetching images, please wait!</p>
            </>
        )
    } else {
        return (
            <>
                <ScoreDisplay 
                    currentScore={score}
                    highScore={highScore}
                />
                <div className="image-cards">
                    {imgOrder.map(ind =>
                        <ImageCard 
                            key={ind}
                            url={imageDetails[ind].url}
                            id={ind}
                            callback={() => clickCallback(ind)}
                        />
                    )}
                </div>
            </>
        )
    }
}