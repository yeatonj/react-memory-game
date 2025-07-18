export default function ScoreDisplay({
    currentScore,
    highScore
}) {
    return (
        <div className="score-display">
            <p>Current Score: {currentScore}</p>
            <p>High Score: {highScore}</p>
        </div>
    )
}