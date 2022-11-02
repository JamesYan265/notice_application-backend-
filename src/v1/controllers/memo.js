const Memo = require('../models/memo');

exports.create = async(req, res) => {
    try {
        //根據mongodb 的資料數目而定
        const memoCount = await Memo.find().count();
        //新memo 創作的API
        const memo = await Memo.create({
            user: req.user._id,
            position: memoCount > 0 ? memoCount : 0,
        });
        res.status(201).json(memo);
    } catch {
        res.status(500).json(err);
    }
};

exports.getAll = async(req, res) => {
    try {
        //根據mongodb 的資料數目而定
        const memos = await Memo.find({user: req.user._id}).sort("-position");
        res.status(200).json(memos);
    } catch {
        res.status(500).json(err);
    }
};

exports.getOne = async(req, res) => {
    const { memoId } = req.params;
    try {
        const memo = await Memo.findOne({user: req.user._id, _id: memoId});
        if(!memo) return res.status(404).json("No this memo");
        res.status(200).json(memo);
    } catch(err) {
        res.status(500).json(err);
    }
}

exports.update = async(req, res) => {
    const { memoId } = req.params;
    const { title, description } = req.body;

    try {
        if (title === "") req.body.title = "無標題";
        if (description === "") req.body.description = "輸入你想書寫的內容";

        const memo = await Memo.findOne({user: req.user._id, _id: memoId});
        if(!memo) return res.status(404).json("No this memo");

        const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
            $set : req.body,
        })
        res.status(200).json(updatedMemo);
    } catch(err) {
        res.status(500).json(err);
    }
}

exports.delete = async(req, res) => {
    const { memoId } = req.params;
    try {
        const memo = await Memo.findOne({user: req.user._id, _id: memoId});
        if(!memo) return res.status(404).json("No this memo");

        await Memo.deleteOne({ _id: memoId});
        res.status(200).json("記事被刪除了");
    } catch(err) {
        res.status(500).json(err);
    }
}
