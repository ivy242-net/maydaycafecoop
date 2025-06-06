import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import TinyMCE from './TinyMCE';

function MenuForm({ label }) {
    const [menuType, setMenuType] = useState('kitchen');
    const [isVegan, setIsVegan] = useState('');
    const [isGlutenFree, setIsGlutenFree] = useState('');
    const [menuContent, setMenuContent] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(image)
        try {
            let dataToSend = {
                "type": menuType,
                "content": menuContent,
                "is_vegan": isVegan,
                "is_glutenfree": isGlutenFree,
                "media": image
            }

            // Make sure we can get the user data before trying to send it
            if (pb.authStore?.model?.id) {
                dataToSend['author'] = pb.authStore.model.id
            }

            const menuData = await pb.collection('specials').create(dataToSend)

            // Success needs to looks like success, for now, we can redirect to the homepage because the menu will be there
            window.location.href = '/';

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            {error && <div>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset class="w-full grid grid-cols-3 gap-4">
                    <select class="select select-bordered w-full" onChange={(e) => setMenuType(e.target.value)}>
                        <option value="kitchen">Kitchen</option>
                        <option value="drink">Drink</option>
                        <option value="bakery">Bakery</option>
                    </select>
                </fieldset>
                <fieldset class="fieldset border border-base-300 rounded-box w-full aspeect-square">
                    <legend class="fieldset-legend">Upload an image of your special</legend>
                    <input type="file" class="file-input" onChange={(e) => setImage(e.target.files[0]) } />
                    <label for="media" class="fieldset-label">Max size 5MB</label>
                </fieldset>

                <TinyMCE value={menuContent} onChange={(val) => setMenuContent(val)} />

                <fieldset class="fieldset bg-base-100 border border-base-300 rounded-box w-64">
                    <legend class="fieldset-legend text-lg">Dietary Restrictions</legend>
                    <label class="fieldset-label text-lg">
                        <input type="checkbox" id="vegan-checkbox" class="checkbox" name="vegan-checkbox" onChange={(e) => setIsVegan(e.srcElement.checked)} />
                        <label for="vegan-checkbox">Vegan</label>
                        <input type="checkbox" id="glutenfree-checkbox" class="checkbox" name="glutenfree-checkbox" onChange={(e) => { setIsGlutenFree(e.srcElement.checked)}} />
                        <label for="glutenfree-checkbox">Gluten free</label>
                    </label>
                </fieldset>

                <button type="submit" class="btn btn-neutral mt-4">Submit</button>
            </form>
        </>
    )
}

export default MenuForm;