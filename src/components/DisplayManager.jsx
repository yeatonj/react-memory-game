import ImageCard from "./ImageCard";
import ScoreDisplay from "./ScoreDisplay";


export default function DisplayManager({
    imageDetails,
    clickCallback,
    score,
    highScore
}) {
    // imageDetails is an array of structs w/ url and a score

    // First make sure we need to display anything at all...
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
    }
   
    // Shuffle image order
    const intialOrder = [];
    for (let i = 0; i < imageDetails.length; i++) {
        intialOrder.push(i);
    }
    const shuffleOrder = [];
    while (intialOrder.length > 0) {
        let takeIndex = Math.floor(Math.random() * (intialOrder.length));
        shuffleOrder.push(intialOrder[takeIndex]);
        intialOrder.splice(takeIndex, 1);
    }
    
    // Now, draw based on that ordering
    return (
        <>
            <ScoreDisplay 
                currentScore={score}
                highScore={highScore}
            />
            <div className="image-cards">
                {shuffleOrder.map(ind =>
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