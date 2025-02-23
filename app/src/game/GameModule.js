import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';

export default function playGame() {
    let scene = new THREE.Scene();
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),
    });

    let camera = new THREE.PerspectiveCamera(30, 1);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 2, 1);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 부드러운 조명
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // 직사광 조명
    directionalLight.position.set(0, 2, 0);
    scene.add(directionalLight);

    let loader = new GLTFLoader();

    // 구장 모델 로딩
    loader.load('./src/texture/stadium/scene.gltf', function (gltf) {
        const stadium = gltf.scene;
        scene.add(stadium);
        gltf.scene.position.set(-21, 0, -10);
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.rotation.y = THREE.MathUtils.degToRad(90);
        stadium.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.material.color.multiplyScalar(0.7);
            }
        });
        renderer.render(scene, camera);
    });

    // 공 모델 로딩
    loader.load('./src/texture/pingpong/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
        renderer.render(scene, camera);
    });

    // loader.load('./src/texture/racket/scene.gltf', function (gltf) {
    //     racket1 = gltf.scene;
    //     racket1.position.set(0, 1.9, 3.2);
    //     racket1.scale.set(0.03, 0.03, 0.03);
    //     racket1.rotation.z = THREE.MathUtils.degToRad(-30);
    //     scene.add(racket1);
    //     renderer.render(scene, camera);
    // });

    // loader.load('./src/texture/racket/scene.gltf', function (gltf) {
    //     racket2 = gltf.scene;
    //     racket2.position.set(0, 1.9, -3.2);
    //     racket2.scale.set(0.03, 0.03, 0.03);
    //     racket2.rotation.z = THREE.MathUtils.degToRad(30);
    //     scene.add(racket2);
    //     renderer.render(scene, camera);
    // });

    // 평면(라켓) 생성 함수
    function createRacket(position) {
        const geometry = new THREE.PlaneGeometry(0.5, 0.5);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // 초록색 라켓
        const racket = new THREE.Mesh(geometry, material);
        racket.position.set(position.x, position.y, position.z);
        return racket;
    }

    const racket1 = createRacket({ x: 0, y: 1.9, z: 3.2 });
    scene.add(racket1);
    const racket2 = createRacket({ x: 0, y: 1.9, z: -3.2 });
    scene.add(racket2);

    // 공 모델 생성
    const sphereGeometry = new THREE.SphereGeometry(0.07, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 'white' });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 2, 0);
    scene.add(sphere);

    // 애니메이션 함수
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // 텍스처 객체 설정
    let texture = {
        ball: sphere,
        you: racket1,
        enemy: racket2,
    };
    return texture;
}
