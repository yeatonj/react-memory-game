export default function ImageCard(
    url,
    id,
    callback
) {
    return (
        <div className="image-card">
            <button onClick={callback()}><img src={url} alt={id} /></button>
        </div>
    )
}