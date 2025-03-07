import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';

export default async function playGame() {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdcdcdc);

    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),
        antialias: true, // 앤티앨리어싱 활성화
    });
    renderer.setPixelRatio(window.devicePixelRatio); // 디스플레이 비율에 맞게 픽셀 비율 설정

    let camera = new THREE.PerspectiveCamera(30, 1);
    camera.position.set(0, 4, 9);
    camera.lookAt(0, 2, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 2, 0);
    scene.add(directionalLight);

    let loader = new GLTFLoader();

    loader.load('./src/texture/stadium/scene.gltf', function (gltf) {
        const stadium = gltf.scene;
        scene.add(stadium);
        gltf.scene.position.set(-21, 0, 0);
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.rotation.y = THREE.MathUtils.degToRad(90);
        renderer.render(scene, camera);
    });

    loader.load('./src/texture/pingpong/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
        renderer.render(scene, camera);
    });

    const loadGLTFModel = (url) => {
        return new Promise((resolve, reject) => {
            loader.load(
                url,
                (gltf) => {
                    resolve(gltf.scene);
                },
                undefined,
                reject,
            );
        });
    };

    const racket1 = await loadGLTFModel('./src/texture/racket/scene.gltf');
    racket1.position.set(0, 1.9, 3.2);
    racket1.scale.set(0.03, 0.03, 0.03);
    racket1.rotation.z = THREE.MathUtils.degToRad(-30);
    scene.add(racket1);

    const racket2 = await loadGLTFModel('./src/texture/racket/scene.gltf');
    racket2.position.set(0, 1.9, -3.2);
    racket2.scale.set(0.03, 0.03, 0.03);
    racket2.rotation.z = THREE.MathUtils.degToRad(30);
    scene.add(racket2);

    const sphereGeometry = new THREE.SphereGeometry(0.07, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 'white' });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 2, 0);
    scene.add(sphere);

    // let isRacketRotated = false;

    // function rotateRacket(angle) {
    //     if (!racket1) return;

    //     racket1.rotation.y += angle;
    //     isRacketRotated = true;

    //     setTimeout(() => {
    //         racket1.rotation.y -= angle;
    //         isRacketRotated = false;
    //     }, 200);
    // }

    function animate() {
        requestAnimationFrame(animate);
        // if (Math.abs(sphere.position.z - 3) < 0.05 && !isRacketRotated) {
        //     if (Math.abs(racket1.position.x + 0.2 - sphere.position.x) < 0.3) {
        //         rotateRacket(THREE.MathUtils.degToRad(45));
        //     }
        // }
        renderer.render(scene, camera);
    }
    animate();

    let game = {
        ball: sphere,
        you: racket1,
        enemy: racket2,
        camera: camera,
    };

    return game;
}
