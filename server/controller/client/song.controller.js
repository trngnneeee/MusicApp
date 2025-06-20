const { categoryTreeBuild, findNode, collectAllChild } = require("../../helper/category.helper");
const Category = require("../../model/category.model");
const Singer = require("../../model/singer.model");
const Song = require("../../model/song.model");

module.exports.listGetToCategory = async (req, res) => {
  try {
    const slug = req.params.slug;

    const categoryDetail = await Category.findOne({
      deleted: false,
      status: "active",
      slug: slug
    })

    const categoryID = categoryDetail.id;
    const categoryList = await Category.find({
      deleted: false,
      status: "active"
    });
    const tree = categoryTreeBuild(categoryList);
    const targetNode = findNode(tree, categoryID);
    const idList = collectAllChild(targetNode);

    const find = {
      deleted: false,
      status: "active"
    };
    if (idList && idList.length) {
      find.category = { $in: idList }
    };
    const rawSongList = await Song.find(find);

    const songList = [];
    for (const song of rawSongList) {
      const tmp = {
        name: song.name,
        avatar: song.avatar,
        singer: [],
        link: `/songs/${song.id}`
      };

      for (const singer of song.singers) {
        const singerDetail = await Singer.findOne({
          _id: singer
        });
        tmp.singer.push(singerDetail.name);
      }

      songList.push(tmp);
    }

    res.json({
      code: "success",
      message: "Lấy dữ liệu thành công!",
      songList: songList
    })
  }
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}

module.exports.listGetToSinger = async (req, res) => {
  try {
    const slug = req.params.slug;

    const singerDetail = await Singer.findOne({
      deleted: false,
      status: "active",
      slug: slug
    });

    const singerID = singerDetail.id;
    const find = {
      singers: singerID
    }
    const rawSongList = await Song.find(find);
    const songList = [];
    for (const song of rawSongList) {
      const tmp = {
        name: song.name,
        avatar: song.avatar,
        singer: [],
        link: `/songs/${song.id}`
      };

      for (const singer of song.singers) {
        const singerDetail = await Singer.findOne({
          _id: singer
        });
        tmp.singer.push(singerDetail.name);
      }

      songList.push(tmp);
    }

    res.json({
      code: "success",
      message: "Lấy dữ liệu thành công!",
      songList: songList
    })
  }
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}

module.exports.listGetToSong = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const rawSongList = await Song.find({
      deleted: false,
      status: 'active',
      category: categoryID
    })

    let songList = [];
    for (const song of rawSongList) {
      const tmp = {
        name: song.name,
        avatar: song.avatar,
        singer: [],
        link: `/songs/${song.id}`
      };

      for (const singer of song.singers) {
        const singerDetail = await Singer.findOne({
          _id: singer
        });
        tmp.singer.push(singerDetail.name);
      }

      songList.push(tmp);
    }

    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      if (!isNaN(limit) && limit > 0) {
        songList = songList.sort(() => Math.random() - 0.5);
        songList = songList.slice(0, limit);
      }
    }

    res.json({
      code: "success",
      message: "Lấy dữ liệu thành công!",
      songList: songList
    })
  }
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}

module.exports.listGet = async (req, res) => {
  const rawSongList = await Song.find({
    deleted: false,
    status: "active"
  })

  let songList = [];
  for (const song of rawSongList) {
    const tmp = {
      name: song.name,
      avatar: song.avatar,
      singer: [],
      link: `songs/${song.id}`
    };

    for (const singer of song.singers) {
      const singerDetail = await Singer.findOne({
        _id: singer
      });
      tmp.singer.push(singerDetail.name);
    }

    songList.push(tmp);
  }

  if (req.query.limit) {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      songList = songList.sort(() => Math.random() - 0.5);
      songList = songList.slice(0, limit);
    }
  }

  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    songList: songList
  })
}

module.exports.detailGet = async (req, res) => {
  try {
    const id = req.params.id;

    const rawSongDetail = await Song.findOne({
      _id: id
    })

    const songDetail = {
      name: rawSongDetail.name,
      avatar: rawSongDetail.avatar,
      category: rawSongDetail.category,
      lyric: rawSongDetail.lyric,
      singer: []
    };

    for (const singer of rawSongDetail.singers) {
      const singerDetail = await Singer.findOne({
        _id: singer
      });
      songDetail.singer.push(singerDetail.name);
    }

    res.json({
      code: "success",
      message: "Lấy dữ liệu thành công!",
      songDetail: songDetail
    })
  }
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}