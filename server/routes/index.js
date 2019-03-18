import express from 'express';

const router = express.Router();

router.route('/test').get((req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'test'
      })
})

router.route('/save-guest').post((req, res, next) => {

})

export default router;