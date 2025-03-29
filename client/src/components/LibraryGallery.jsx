import { h } from 'preact';
// uninstall if i decide not to use
// import { Buffer } from 'buffer';
import { useState, useEffect } from 'preact/hooks';

function LibraryGallery({ label }) {
    const [data, updateData] = useState();

    useEffect(() => {
      const getData = async () => {
        let data = await pb.collection('specials').getFullList(200)
        data.forEach(async (record) => {
            record['imageUrl'] = pb.files.getURL(record, record['media']);

            // Not sure if this is worth doing
            // const response = await fetch(record['imageUrl']);
            // const contentType = response.headers.get('Content-Type');
            // const buffer = await response.arrayBuffer();
            // record['imageDataUrl'] = 'data:' + contentType + ';base64,' + Buffer.from(buffer).toString('base64');
        })
        updateData(data);
      }
      getData();
    }, []);
  
    return data && (
        <>
            {data.map((special) => 
            <div class="card bg-base-100 w-96 mt-5 shadow-sm">
            <figure>
              <img
                src={special['imageUrl']}
                alt={special['content']} />
            </figure>
            <div class="card-body">
              <p>{special['content']}</p>
              <div class="card-actions justify-end">
                {/* <a href="#" class="btn btn-primary" id="btn-download" download={special['imageUrl']}>Save Image</a> */}
              </div>
            </div>
          </div>
            )}
        </>
    )
}

export default LibraryGallery;