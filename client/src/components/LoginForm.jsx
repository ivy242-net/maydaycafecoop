import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function LoginForm({ label }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authData = await pb.collection('users').authWithPassword(
                email,
                password,
            );
            window.location.href = '/post';
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            {error && <div>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset class="fieldset">
                    <label class="fieldset-label">Email</label>
                    <input type="email" class="input w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label class="fieldset-label">Password</label>
                    <input type="password" class="input w-full" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button type="submit" class="btn btn-neutral mt-4">Submit</button>
                </fieldset>
            </form>
        </>
    )
}

export default LoginForm;