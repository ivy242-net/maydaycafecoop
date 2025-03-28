import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function LibraryGallery({ label }) {
    const [data, updateData] = useState();

    useEffect(() => {
      const getData = async () => {
        const data = await pb.collection('specials').getFullList(200)
        updateData(data);
      }
      getData();
    }, []);
  
    return data && (
        <>
            {data.map((special) => <li>
                {special['content']}
            </li>)}
        </>
    )
}

export default LibraryGallery;