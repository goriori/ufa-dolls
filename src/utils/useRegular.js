

export const useRegular = () => {
    const dateRegular = /(0?[1-9]|[12][0-9]|3[01])[/\-.](0?[1-9]|1[012])[ /.-]/
    const emailRegular =
        /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.(ru|com|net|org|edu|gov|mil|int|biz|info|name|pro|museum)$/
    const phoneRegular = /^\+?[1-9][0-9]{7,14}$/
    const dateTest = (date) => dateRegular.test(date)
    const emailTest = (email) => emailRegular.test(email)
    const phoneTest = (phone) => phoneRegular.test(phone)

    return {
        dateTest,
        emailTest,
        phoneTest
    }
}