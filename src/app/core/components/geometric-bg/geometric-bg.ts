import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Shape {
  x: number;
  y: number;
  size: number;
  type: 'circle' | 'square' | 'triangle';
  vx: number;
  vy: number;
  rotation: number;
  vRotation: number;
  opacity: number;
}

@Component({
  selector: 'app-geometric-bg',
  templateUrl: './geometric-bg.html',
  styleUrl: './geometric-bg.css',
  standalone: true,
})
export class GeometricBg implements AfterViewInit, OnDestroy {
  @ViewChild('canvasRef', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private animationId: any;
  private shapes: Shape[] = [];
  private platformId = inject(PLATFORM_ID);
  private resizeObserver: ResizeObserver | null = null;

  private w!: number;
  private h!: number;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.resizeCanvas();
    this.initShapes();
    this.animate();

    window.addEventListener('resize', this.handleResize);

    const parent = canvas.parentElement;
    if (parent) {
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      this.resizeObserver.observe(parent);
    }
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.handleResize);
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    }
  }

  private resizeCanvas = () => {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    if (parent) {
      this.w = canvas.width = parent.clientWidth;
      this.h = canvas.height = parent.clientHeight;
    } else {
      this.w = canvas.width = window.innerWidth;
      this.h = canvas.height = window.innerHeight;
    }
  };

  private initShapes(): void {
    // Fewer shapes: increased divisor from 100000 to 133333 (approx 25% reduction)
    const shapeCount = Math.floor((this.w * this.h) / 133333) + 2;
    this.shapes = [];

    for (let i = 0; i < shapeCount; i++) {
      this.shapes.push(this.createShape());
    }
  }

  private createShape(): Shape {
    const types: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    return {
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      // Larger shapes: increased size from 10-40 to 60-160
      size: Math.random() * 100 + 60,
      type: types[Math.floor(Math.random() * types.length)],
      // Faster movement: increased multiplier from 0.5 to 1.2
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      rotation: Math.random() * Math.PI * 2,
      vRotation: (Math.random() - 0.5) * 0.005,
      // More translucent: adjusted range
      opacity: Math.random() * 0.05 + 0.02,
    };
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.w, this.h);

    this.shapes.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      s.rotation += s.vRotation;

      // Wrap around screen
      if (s.x < -s.size) s.x = this.w + s.size;
      if (s.x > this.w + s.size) s.x = -s.size;
      if (s.y < -s.size) s.y = this.h + s.size;
      if (s.y > this.h + s.size) s.y = -s.size;

      this.ctx.save();
      this.ctx.translate(s.x, s.y);
      this.ctx.rotate(s.rotation);

      // Crystalline effect: radial gradient with a bright highlight-like center
      const gradient = this.ctx.createRadialGradient(-s.size * 0.2, -s.size * 0.2, 0, 0, 0, s.size);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity * 0.8})`);
      gradient.addColorStop(0.4, `rgba(255, 255, 255, ${s.opacity * 0.3})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();

      if (s.type === 'circle') {
        this.ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
      } else if (s.type === 'square') {
        this.ctx.rect(-s.size / 2, -s.size / 2, s.size, s.size);
      } else if (s.type === 'triangle') {
        const h = (s.size * Math.sqrt(3)) / 2;
        this.ctx.moveTo(0, -h / 2);
        this.ctx.lineTo(s.size / 2, h / 2);
        this.ctx.lineTo(-s.size / 2, h / 2);
        this.ctx.closePath();
      }

      this.ctx.fill();
      // Border removed per user request
      this.ctx.restore();
    });

    this.animationId = requestAnimationFrame(this.animate);
  };

  private handleResize = () => {
    this.resizeCanvas();
    this.initShapes();
  };
}
