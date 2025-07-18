import DisplayManager from "./DisplayManager";

import { useState, useEffect } from 'react'

const urlPrefix = 'https://cataas.com/cat/';

export default function GameManager() {
    // Set state
    const [cats, setCats] = useState(null);

    // Grab the cat picture urls
    useEffect(() => {
      const fetchCats = async () => {
        try {
          const response = await fetch('https://cataas.com/api/cats?limit=12&skip=0');
          console.log(response);
          const data = await response.json();
          // Now map to the cat state
          const catData = data.map((entry) => {
            new {
                url: urlPrefix + entry.id,
                score: 0
            }
          });
          setCats(catData);

          console.log(catData);
          
        } catch (err) {
          console.error('Issue getting cat:', err);
        }

      }
      fetchCats();
    }, []);

}