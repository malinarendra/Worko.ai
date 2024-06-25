module.exports = (user) => (
    {
        id: user._id,
        email: user.email,
        name: user.name,
        age: user.age,
        city: user.city,
        zipcode: user.zipcode
    }
)