export const validatePaymentData = (req, res, next) => {
    if (!req.body.amount) {
        res.status(400).json({ error: 'Amount is required' });
        return;
    }
    next();
};
