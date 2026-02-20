import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-animated-bg',
  templateUrl: './animated-bg.html',
  styleUrl: './animated-bg.css',
  standalone: true,
})
export class AnimatedBg implements AfterViewInit, OnDestroy {
  @ViewChild('canvasRef', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private animationId: any;
  private resizeObserver: ResizeObserver | null = null;

  private cols!: number;
  private ypos!: number[];
  private w!: number;
  private h!: number;

  private characters =
    'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private lastTime = 0;
  private fps = 20; // Throttled for that classic Matrix look

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.resizeCanvas();
    this.initMatrix(true); // Initial random state

    this.animate(0);

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
    window.removeEventListener('resize', this.handleResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
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

  private initMatrix(randomize: boolean = false): void {
    this.cols = Math.floor(this.w / 20) + 1;
    if (randomize) {
      this.ypos = Array.from(
        { length: this.cols },
        () => Math.floor(Math.random() * (this.h / 20)) * 20,
      );
    } else {
      this.ypos = Array(this.cols).fill(0);
    }

    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  private animate = (time: number) => {
    // Throttle frame rate
    if (time - this.lastTime < 1000 / this.fps) {
      this.animationId = requestAnimationFrame(this.animate);
      return;
    }
    this.lastTime = time;

    // Faint overlay to create trail effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.w, this.h);

    this.ctx.font = '15px monospace';

    this.ypos.forEach((y, ind) => {
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      const x = ind * 20;

      // Draw the "head" character in a brighter color
      this.ctx.fillStyle = '#8f8'; // Light green for the lead
      this.ctx.fillText(text, x, y);

      // Every few frames, highlight the head in white for extra flicker
      if (Math.random() > 0.9) {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(text, x, y);
      }

      // Draw the regular body characters in green
      this.ctx.fillStyle = '#0f0';

      // Reset drop when it reaches the bottom or randomly
      if (y > this.h && Math.random() > 0.98) {
        this.ypos[ind] = 0;
      } else {
        this.ypos[ind] = y + 20;
      }
    });

    this.animationId = requestAnimationFrame(this.animate);
  };

  private handleResize = () => {
    this.resizeCanvas();
    const oldCols = this.cols;
    this.cols = Math.floor(this.w / 20) + 1;

    // Adjust ypos array for new cols without resetting everything to 0
    if (this.cols > oldCols) {
      const extra = Array.from(
        { length: this.cols - oldCols },
        () => Math.floor(Math.random() * (this.h / 20)) * 20,
      );
      this.ypos = [...this.ypos, ...extra];
    } else if (this.cols < oldCols) {
      this.ypos = this.ypos.slice(0, this.cols);
    }

    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.w, this.h);
  };
}
