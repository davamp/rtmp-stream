const NodeMediaServer = require("node-media-server");
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');

// fs.rmdirSync('./media', { recursive: true, force: true });

const httpConfig = {
  port: 8000,
  allow_origin: "*",
  mediaroot: "./media",
};

const rtmpConfig = {
  port: 1935,
  chunk_size: 60000,
  gop_cache: true,
  ping: 30,
  ping_timeout: 60
};

const transformationConfig = {
    ffmpeg: ffmpegPath,
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        hlsKeep: true, // to prevent hls file delete after end the stream
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
        dashKeep: true // to prevent dash file delete after end the stream
      }
    ]
  };
const fissionConfig = {
  ffmpeg: ffmpegPath,
  tasks: [
    {
      rule: "live/*",
      model: [
        {
          ab: "128k",
          vb: "1500k",
          vs: "1280x720",
          vf: "30"
        },
        {
          ab: "96k",
          vb: "1000k",
          vs: "854x480",
          vf: "30"
        },
        {
          ab: "96k",
          vb: "600k",
          vs: "640x360",
          vf: "30"
        }
      ]
    }
  ]
}

const config = {
  http: httpConfig,
  rtmp: rtmpConfig,
  trans: transformationConfig,
  fission: fissionConfig
};

const nms = new NodeMediaServer(config);

nms.run();


nms.on("preConnect", (id, args) => {
  console.log(
    "[NodeEvent on preConnect]",
    `id=${id} args=${JSON.stringify(args)}`,
  );
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on("postConnect", (id, args) => {
  console.log(
    "[NodeEvent on postConnect]",
    `id=${id} args=${JSON.stringify(args)}`,
  );
});

nms.on("doneConnect", (id, args) => {
  console.log(
    "[NodeEvent on doneConnect]",
    `id=${id} args=${JSON.stringify(args)}`,
  );
});

nms.on("prePublish", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on prePublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  );
  // Implement authentication for your streamers...
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on("postPublish", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on postPublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  );

});

nms.on("donePublish", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on donePublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  );
});

nms.on("prePlay", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on prePlay]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  );
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on("postPlay", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on postPlay]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  );
});

nms.on("donePlay", (id, StreamPath, args) => {
  console.log(
    "[NodeEvent on donePlay]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  );
});
