// Route to handle user login
app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;

    // Retrieve user from the database by username
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], async (err, user) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // If user not found
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If username and password are correct, send a success response
        res.status(200).json({ message: 'Login successful', user: { username: user.username } });
    });
});
