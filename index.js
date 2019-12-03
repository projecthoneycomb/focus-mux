require('dotenv').config();
const NodeMediaServer = require('node-media-server');
 
const config = {
  rtmp: {
    port: process.env.RTMP_INGEST_PORT,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: process.env.HTTP_PORT,
    webroot: './public',
    mediaroot: './media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        ac: 'aac',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};
 
var nms = new NodeMediaServer(config)
nms.run();

nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('ListenerAttachedToDASH', (id, args) => {
  console.log('ListenerAttachedToDASH');
});