import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto'; 

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua data proyek' })
  getAllProjects() {
    return this.projectsService.findAll();
  }

 @Get(':id/history')
 @ApiOperation({ summary: 'Lihat riwayat perubahan progress proyek' })
 getProjectHistory(@Param('id') id: string) {
  return this.projectsService.getHistory(+id);
 }	

  @Post()
  @ApiOperation({ summary: 'Tambah proyek baru' })
  // Kita ganti 'any' menjadi 'CreateProjectDto' agar form muncul di Swagger
  createNewProject(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }

  @Patch(':id/progress')
  @ApiOperation({ summary: 'Update progress persentase proyek' })
  // Menambahkan dokumentasi untuk body di Swagger
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { percentage: { type: 'number', example: 75 } } 
    } 
  })
  updateProgress(@Param('id') id: string, @Body('percentage') percentage: number) {
    return this.projectsService.updateProgress(+id, percentage);
  }
}